var express = require('express'), db
	, bodyParser = require('body-parser')
	, mongodb = require('mongodb')
	, path = require('path');

hash = (pwd) => require('crypto').createHash('sha1').update('your_salt').update(pwd).digest('hex');
fromToken = (usr, h) => hash(usr) == h ? usr : null;
toToken = (id) => [id, hash(id)].join(' ');
noPass = (obj) => { delete obj.password; return obj }



var api = express.Router();
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(require('cors')({ allowedHeaders: "authorization", exposedHeaders: "authorization" }));
api.use(require('multer')().fields([]));
api.use((req, res, next) => { if (req.body.password) req.body.password = hash(req.body.password); next() });
api.use((req, res, next) => { if (req.headers.authorization) req.user = fromToken(...req.headers.authorization.split(" ")); next() });



api.post('/token', (req, res) => db.collection('users')
	.findOne({ _id: req.body._id, password: req.body.password })
	.then(usr => res.set('authorization', usr ? toToken(usr._id) : null).sendStatus(usr ? 200 : 404))
)

api.get('/user', (req, res) => {
	Object.keys(req.query).forEach((key, i) => req.query[key] = { $regex : new RegExp(`${req.query[key]}`,'i') });
	db.collection('users')
		.find( req.query, { fields: { password: 0 } }).toArray()
		.then(r => res.json(r))
})

api.get('/user/proj', (req, res) => {
	db.collection('users')
		.aggregate([{ $project: { _id: 1, firstName: 1, lastName: 1, department: 1, domain: 1, knowledge: 1, avatar: 1} }]).toArray()
		.then(r => res.json(r))
})
api.get('/user/:_id', (req, res) => {
	let prom_usr = db.collection('users')
		.findOne({ _id: req.params._id }, { fields: { password: 0 } });
	let prom_act = db.collection('activities')
		.find({ u_id: req.params._id }).toArray();
	Promise.all([prom_usr,prom_act]).then(([usr,acts]) => {usr.activities=acts;res.json(usr)})
})
api.get('/user/:_id/proj', (req, res) => { //a revoir
	db.collection('users')
		.aggregate([
			{ $match: { _id: req.params._id } },
			{ $project: { _id: 1, firstName: 1, lastName: 1, department: 1, domain: 1, avatar: 1} }
		]).toArray()
		.then(r1 => {
			db.collection('users')
				.aggregate([{ $unwind: '$domain' },
					{ $match: { $or: [{ department: r1[0].department }, { domain: { $in: r1[0].domain||[] } }] } },
					{ $project: { _id: 1, firstName: 1, lastName: 1, department: 1, domain: '$domain', knowledge: 1, avatar: 1} },
					{ $group: { _id: { _id: '$_id', firstName: '$firstName', lastName: '$lastName', department: '$department', avatar: '$avatar',}, domain: { $push: '$domain' } } }
				]).toArray()
				.then(r2 => {
					res.json(r2.map(v => { v._id.domain = v.domain; return v._id }))
				})
		})
})
api.post('/users', (req, res) => {
	var write, col = db.collection('users');
	["domain","publications","knowledge"].forEach(n=>req.body[n]=req.body[n].filter(e=>e!==''))
	if (req.user == req.body._id) { // authenticated request => user is updating it profile
		if (req.body.password == "") delete req.body.password;//empty pass == no update
		write = col.update({ _id: req.user }, { $set: req.body });
	} else {
		write = col.insert(req.body);
	}
	write.then(doc => {
		if (!doc) return res.sendStatus(500);
		res.set('authorization', toToken(req.body._id));//set/update fetch token with the created/updated user
		return res.json(doc.ops ? doc.ops[0] : doc);
	}).catch(console.log);
})

api.get('/activity', (req, res) => {
	Object.keys(req.query).forEach((key, i) => req.query[key] = { $regex : new RegExp(`${req.query[key]}`,'i') });
	db.collection('activities')
		.aggregate([{$match:req.query}]).toArray()
		.then(r => res.json(r))
})
api.get('/activity/tags', (req, res) => {
	db.collection('activities')
		.aggregate([{ $project: { activity: 1 } }]).toArray()
		.then(act => res.json([...new Set(act.forEach(act => act.activity))]))
})

api.get('/activity/:_id', (req, res) => {
	db.collection('activities')
		.findOne({ _id: req.params._id })
		.then(r => res.json(r))
})
api.delete('/activity/:_id', (req, res) => {
	if (!req.user) return res.sendStatus(401);
	var col = db.collection('activities');
	console.log(req.params._id, req.user);
	col.findOneAndDelete({ _id: req.params._id, u_id: req.user })
	.then(cmd=> res.status(cmd.ok ? 200 : 404).json(cmd))
	.catch(console.error)
})
api.post('/activity', (req, res) => {
	if (!req.user) return res.sendStatus(401);
	var prom, col = db.collection('activities');
	req.body.u_id = req.user;
	console.log(req.body.tags)
	req.body.tags = req.body.tags.filter(t=>t!='');
	if (req.body._id)
		write = col.update({ _id: req.body._id, u_id: req.user }, { $set: req.body }, { upsert: true })
	else {
		req.body._id = [req.user, +new Date()].join('-');
		write = col.insert(req.body)
	}
	write.then(doc => doc ? res.send(doc) : res.sendStatus(500))
})
api.get('/search', (req, res) => {
	if (req.query.type == "activity") {
		return db.collection('activities').find({ $text: { $search: req.query.keyword } }).toArray()
			.then(doc => res.json([[], doc]))
	} else if (req.query.type == "user") {
		var keys = req.query.keyword.split(" ").map(x => new RegExp("^" + x + "$", "i"))
		return db.collection('users').find({ $or: [{ firstName: { $in: keys } }, { lastName: { $in: keys } }] }).toArray()
			.then(doc => res.json([doc, []]))
	} else {
		let p = ['users', 'activities'].map(d => db.collection(d).find({ $text: { $search: req.query.keyword } }).toArray());
		return Promise.all(p).then(doc => res.json(doc));
	}
})


// catch any mongo/express Errors
api.use((err, req, res, next) => { console.error(err.stack); res.status(500).json(err) });

mongodb.MongoClient.connect('mongodb://user:password@127.0.0.1:27017/?authSource=admin', {})
	.then(c => db = c.db("km"))
	.catch(err => console.log(err));

module.exports = api;
