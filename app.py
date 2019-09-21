#!/usr/bin/env python3
from os import environ as env
from flask import Flask, request, g, send_from_directory, abort
from flask_restful import Api, Resource
from sqlt import Sqlt, Jwt, Rest

jwt_secret = env.get('JWT_SALT', '')
app = Flask(__name__)
api = Api(app)


@api.resource('/auth/')
class Auth(Resource):
    def delete(self):
        return Jwt.flush()

    def post(self):
        form = request.get_json(True)
        query = {'id': form['username'], '_password': form['password']}
        if not g.db.get('user', query):
            abort(403)
        return Jwt.encode(jwt_secret, {'name': form['username']})


@app.before_request
def spa():
    if "text/html" in request.accept_mimetypes.values():
        response = send_from_directory('static', 'index.html')
        response.cache_control.max_age = 0  # avoid fetch() cache
        return response  # return the SPA if request accept HTML
    (meth, path) = (request.method, request.path)
    if path.startswith('/static/'):
        return None
    g.db = Sqlt(env.get('DB_PATH', __name__+".sqlite"),
                env.get('PWD_SALT', ''))
    if meth == 'GET' or (meth == 'POST' and path in ('/auth/', '/user/')):
        return None  # allow anonymous GET and POST signin,signup
    g.user = Jwt.decode(jwt_secret, request.cookies,
                        request.headers.get('Authorization'))


@api.resource('/<table>/', '/<table>/<id>')
class Security(Rest):
    def user_put(self, id, vals):
        vals['id'] = id  # forbid id change
        if g.user['name'] == id:
            return {"id": id}

    def user_delete(self, id):
        if g.user['name'] == id:
            return {"id": id}

    def activity_post(self, vals):
        return {**vals, 'u_id': g.user['name']}

    def activity_put(self, id, vals):
        vals['id'] = id  # forbid id change
        return {'id': id, "u_id": g.user['name']}

    def activity_delete(self, id):
        return {'id': id, "u_id": g.user['name']}


if __name__ == '__main__':
    app.run(debug=True)
