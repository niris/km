#!/usr/bin/env python3

import types, jwt, time, datetime
from flask import Flask, request, send_from_directory
from flask_restful import Api, Resource
from pymongo import MongoClient

MONGO_URI = "mongodb://user:password@localhost:27017/km?authSource=admin"
MONGO_BASE = 'km'

app = Flask(__name__)
api = Api(app)
db = MongoClient(MONGO_URI)[MONGO_BASE]

@app.before_request
def before_request():
	if "text/html" in request.accept_mimetypes.values():
		return send_from_directory('static', 'index.html')

@api.resource('/user/', '/user/<user_id>')
class User(Resource):
	def get(self, user_id=None):
		if user_id :
			return db.users.find_one({"_id":user_id})
		return list(db.users.find(request.args.to_dict()))

@api.resource('/user/<user_id>/neighbors')
class Neighbors(Resource):
	def get(self, user_id):
		user = list(db.users.aggregate([{ "$match": { "_id": _id } },{ "$project": { "_id": 1, "firstName": 1, "lastName": 1, "department": 1, "domain": 1, "avatar": 1} }]))
		neighbors = list(db.users.aggregate([
			{ "$unwind": '$domain' },
			{ "$match": { "domain": { "$in": user[0]["domain"] or [] }}},
			{ "$project": { "_id": 1, "firstName": 1, "lastName": 1, "department": 1, "domain": '$domain', "knowledge": 1, "avatar": 1} },
			{ "$group": { "_id": { "_id": '$_id', "firstName": '$firstName', "lastName": '$lastName', "department": '$department', "avatar": '$avatar',}, "domain": { "$push": '$domain' } } }
		]))
		def replace(x):
			x["_id"]["domain"] = x["domain"]
			return x["_id"]
		return  list(map(lambda x: replace(x), neighbors))

if __name__ == '__main__':	
    app.run() 

