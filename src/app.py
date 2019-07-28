#!/usr/bin/env python3
import types, jwt, time, datetime
from flask import Flask, request, send_from_directory, make_response, abort, jsonify
from flask_restful import Api, Resource
from pymongo import MongoClient
from bson.json_util import dumps

MONGO_URI = "mongodb://user:password@49.48.148.10:2030/km?authSource=admin"
MONGO_DB = 'km'

app = Flask(__name__)
api = Api(app)
db = MongoClient(MONGO_URI)[MONGO_DB]

@app.before_request
def before_request():
	if "text/html" in request.accept_mimetypes.values():
		response = send_from_directory('static', 'index.html')
		response.cache_control.max_age = 0
		return response

@api.resource('/user/', '/user/<user_id>')
class User(Resource):
	def get(self, user_id=None):
		if user_id :
			return db.users.find_one({"_id":user_id})
		return list(db.users.find(request.args.to_dict()))

@api.resource('/user/<user_id>/neighbors')
class Neighbors(Resource):
	def get(self,user_id):
		# retrieve user information
		user = list(db.users.aggregate([{ "$match": { "_id": user_id } },{ "$project": { "_id": 1, "firstName": 1, "lastName": 1, "department": 1, "domain": 1, "avatar": 1} }]))
		#retrive neighbors having common domain of interests
		neighbors = list(db.users.aggregate([
			{ "$unwind": '$domain' },
			{ "$match": { "domain": { "$in": user[0]["domain"] or [] }}},
			{ "$project": { "_id": 1, "firstName": 1, "lastName": 1, "department": 1, "domain": '$domain', "knowledge": 1, "avatar": 1} },
			# grooup by : group  informations of the same user in one row by merging domains in a list
			{ "$group": { "_id": { "_id": '$_id', "firstName": '$firstName', "lastName": '$lastName', "department": '$department', "avatar": '$avatar',}, "domain": { "$push": '$domain' } } }
		]))
		# replace the list of agregated domains in the list of neighbors informations
		def replace(x):
			x["_id"]["domain"] = x["domain"]
			return x["_id"]
		return  list(map(lambda x: replace(x), neighbors))

@api.resource('/auth/')
class Auth(Resource):
	secret = app.secret_key or "your-256-bit-secret"
	cookies = {'header': (False, 0), 'payload': (False, 1), 'signature': (True, 2)}
	@staticmethod
	@app.before_request
	def auth_required():
		if request.method == 'GET' or request.path == '/auth/':
			return None
		try:
			cookie = [request.cookies.get(name) for name,(http,i) in Auth.cookies.items()]
			cookie = '.'.join(cookie) if all(cookie) else None
			header = request.headers.get('Authorization')
			header = header[len('Bearer '):] if header and header.startswith('Bearer ') else None
			g.user = jwt.decode(cookie or header, Auth.secret)
		except jwt.exceptions.DecodeError:
			abort(403)
	def delete(self):
		response = make_response("{}")
		for name, (http, _) in self.cookies.items():
			response.set_cookie(name, '', httponly=http, expires=0)
		return response
	def post(self):
		import hashlib
		user = request.get_json(True) # ... or request.form.to_dict() ?
		password = hashlib.sha1(str('your_salt' + user['password']).encode('utf-8')).hexdigest()
		if not db.users.find_one({'_id':user['username'], 'password': password }):
			abort(403)
		payload = {'name': user['username']}
		token = jwt.encode(payload, Auth.secret)
		response = make_response(jsonify(token))
		for name, (http, i) in self.cookies.items():
			response.set_cookie(name, token.split(b'.')[i], httponly=http)
		return response

if __name__ == '__main__':	
	app.run() 

