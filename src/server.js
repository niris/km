const path = require('path');
const express = require('express');
const app = express(), port=3200;

app.use('/api', require('./api'));

const dist = express.static(path.join(__dirname,'../dist'));
app.use(dist, require('connect-history-api-fallback')(), dist);

app.use((err, req, res, next) => {console.error(err.stack);res.status(500).json(err)});
app.listen(port, ()=>console.log(`Started on http://localhost:${port}`));
