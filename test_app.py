#!/usr/bin/env python3
from unittest import TestCase
from unittest.mock import patch
from app import app
from sqlt import Sqlt
import os, json

db_path='file::memory:?cache=shared'
@patch.dict(os.environ,{'DB_PATH':db_path})
class AppTest(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.db = Sqlt(db_path, '')
        cls.db._create("user", id="PRIMARY KEY", _password="", desc="", wishList="")._commit()
        cls.db._create("activity", id="INTEGER PRIMARY KEY", u_id="", desc="")._commit()

    def test_spa(self):
        c = app.test_client()
        res = c.get('/what/ever/value', headers={'accept': 'text/html'})
        self.assertEqual(res.status_code, 200)
        self.assertIn("<html", res.get_data(True))
        res.close()

        res = c.get('/what/ever/value')
        self.assertEqual(res.status_code, 404)
    
    def test_user(self):
        c = app.test_client()
        # GET: empty database
        users = c.get('/user/').json
        self.assertListEqual(users, [])

        # POST: register
        (user_id, user_pass) = ('tony', "secret")
        res = c.post('/user/', data=json.dumps({'id':user_id, '_password':user_pass}))
        self.assertEqual(201, res.status_code)

        # PUT: edit user => 403
        self.assertEqual(403, c.put(f'/user/{user_id}', data=json.dumps({'desc':'hello'})).status_code)
        
        # DELETE: user => 403
        self.assertEqual(403, c.delete(f'/user/{user_id}').status_code)

        # GET: user
        user = c.get(f'/user/{user_id}').json
        self.assertNotIn('_password', user)
        self.assertIn('id', user)
        self.assertEqual(user['id'], user_id)

        # GET: user list
        self.assertListEqual([user], c.get('/user/').json)

        # POST: login
        jwt = c.post('/auth/', data=json.dumps({'username':user_id, 'password':user_pass})).json
        self.assertEqual(len(jwt.split('.')), 3)
        self.assertEqual(len(c.cookie_jar), 3)
        
        # PUT: working + listing
        c.put(f'/user/{user_id}', data=json.dumps({'desc':'hello', "wishList": ['1',"2"]})).json
        user = c.get(f'/user/{user_id}').json
        self.assertEqual(user['desc'], 'hello')
        self.assertListEqual(user['wishList'], ['1',"2"])

        # DELETE: user
        self.assertEqual(200, c.delete(f'/user/{user_id}').status_code)
        self.assertListEqual([], c.get('/user/').json)
        self.assertEqual(404, c.get(f'/user/{user_id}').status_code)

        #DELETE: auth = logout
        self.assertEqual(len(c.cookie_jar), 3)
        c.delete('/auth/')
        self.assertEqual(len(c.cookie_jar), 0)

    def test_activity(self):
        (c1, user_id1, user_pass1) = (app.test_client(), 'tony1', "secret1")
        (c2, user_id2, user_pass2) = (app.test_client(), 'tony2', "secret2")

        self.assertEqual(201, c1.post('/user/', data=json.dumps({'id':user_id1, '_password':user_pass1})).status_code)
        self.assertEqual(201, c2.post('/user/', data=json.dumps({'id':user_id2, '_password':user_pass2})).status_code)

        self.assertEqual(200, c1.post('/auth/', data=json.dumps({'username':user_id1, 'password':user_pass1})).status_code)
        self.assertEqual(200, c2.post('/auth/', data=json.dumps({'username':user_id2, 'password':user_pass2})).status_code)
        
        res = c1.post('/activity/', data=json.dumps({'desc':'hello'}))
        self.assertEqual(201, res.status_code)
        act1 = c1.get(f'/activity/{res.json}').json
        self.assertEqual(act1['u_id'], 'tony1')
        self.assertEqual(act1['desc'], 'hello')
        
        self.assertEqual(404, c2.put(f'/activity/{act1["id"]}', data=json.dumps({'desc':'hello!'})).status_code)
        self.assertEqual(404, c2.delete(f'/activity/{act1["id"]}').status_code)

        self.assertEqual(200, c1.put(f'/activity/{act1["id"]}', data=json.dumps({'desc':'hello!'})).status_code)
        self.assertEqual(200, c1.delete(f'/activity/{act1["id"]}').status_code)

        self.assertEqual(200, c1.delete(f'/user/{user_id1}').status_code)
        self.assertEqual(200, c2.delete(f'/user/{user_id2}').status_code)
