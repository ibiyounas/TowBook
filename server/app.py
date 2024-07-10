#!/usr/bin/env python3

from flask import request, session, jsonify, make_response
from flask_bcrypt import Bcrypt
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_migrate import Migrate
from config import app, db, bcrypt, api, CORS
from models import User, Driver, Clients, Car, Trips  # Use relative import

# Define your routes
class ClearSession(Resource):
    def delete(self):
        session.clear()
        return '', 204

class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
            if User.query.filter_by(username=username).first():
                return {'message': 'User already exists'}, 400
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            new_user = User(username=username, _password_hash=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        except Exception as e:
            return {'message': str(e)}, 500

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        print(f"Session user_id: {user_id}")
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user.to_dict()
            return {'message': 'User not found'}, 404
        return {'message': '401: Not Authorized'}, 401

class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
            user = User.query.filter_by(username=username).first()
            if not user:
                return {'message': 'User does not exist'}, 400
            if not bcrypt.check_password_hash(user._password_hash, password):
                return {'message': 'Incorrect password'}, 400
            session['user_id'] = user.id
            session.modified = True
            print(f"Session set: {session['user_id']}")
            return user.to_dict()
        except Exception as e:
            return {'message': str(e)}, 500

class Logout(Resource):
    def delete(self):
        session.clear()
        return '', 204

class UpdateAvatar(Resource):
    def patch(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        avatar_url = request.json.get('avatar_url')
        if avatar_url:
            user.avatar_url = avatar_url
            db.session.commit()
            return user.to_dict(), 200
        return {'message': 'No avatar URL provided'}, 400

class UpdateUsername(Resource):
    def patch(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'message': '401: Not Authorized'}, 401
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        username = request.json.get('username')
        if username:
            user.username = username
            db.session.commit()
            return user.to_dict(), 200
        return {'message': 'No username provided'}, 400

api.add_resource(ClearSession, '/clear_session')
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(UpdateAvatar, '/update_avatar')
api.add_resource(UpdateUsername, '/update_username')

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = [user.to_dict() for user in users]
        return make_response(users_list, 200)
    
api.add_resource(Users, '/users')

class Tripss(Resource):
    def get(self, id):
        trips = Trips.query.filter_by(id=id).all()
        trips_list = [trip.to_dict() for trip in trips]
        return make_response(trips_list, 200)
    
    def post(self, id):
        params = request.json
        trip = Trips(id=id, workout_id=params['workout_id'])
        db.session.add(trip)
        db.session.commit()
        return make_response(trip.to_dict(), 201)
    
    def delete(self, id):
        trips = Trips.query.filter_by(id=id).first()
        if trips:
            db.session.delete(trips)
            db.session.commit()
            return make_response({"message": "Trip deleted"}, 200)
        else:
            return make_response({'message': 'Trip not found'}, 404)

api.add_resource(Tripss, '/tripss/<int:id>')

class Tripses(Resource):
    def get(self):
        trips = Trips.query.all()
        trips_list = [trip.to_dict() for trip in trips]
        return make_response(trips_list, 201)
    
    def post(self):
        params = request.json
        try:
            trip = Trips(id=params['id'],
                            car_vin=params['car_vin'],
                            driver_id=params['driver_id'],
                            client_id=params['client_id'],
                            status=params['status'],
                            pickup_location=params['pickup_location'],
                            dropoff_location=params['dropoff_location'])
            db.session.add(trip)
            db.session.commit()
            return make_response(trip.to_dict(), 201)
        except Exception as e:
            return make_response(str(e), 400)
    

api.add_resource(Tripses, '/trips')

class Cars(Resource):
    def get(self):
        cars = Car.query.all()
        cars_list = [car.to_dict() for car in cars]
        return make_response(cars_list, 201)
    def post(self):
        params = request.json
        try:
            car = Car(vin=params['vin'],
                            make=params['make'],
                            model=params['model'],
                            year=params['year'],
                            owner_id=params['owner_id'])
            db.session.add(car)
            db.session.commit()
            return make_response(car.to_dict(), 201)
        except Exception as e:
            return make_response(str(e), 400)
    

api.add_resource(Cars, '/cars')

class ClientsById(Resource):
    def get(self, id):
        client = Clients.query.filter_by(id=id).first()
        if client:
            return make_response(client.to_dict(), 200)
        else:
            return make_response({'message': 'Client not found'}, 404)
        
    def patch(self, id):
        client = Clients.query.filter_by(id=id).first()
        if not client:
            return make_response({"error": "User not found"}, 404)
        try:
            params = request.json
            for attr in params:
                setattr(client, attr, params[attr])
            db.session.add(client)
            db.session.commit()

            client_dict = client.to_dict()
            return make_response(client_dict, 202)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
    
api.add_resource(ClientsById, '/client/<int:id>')

class Clientses(Resource):
    def get(self):
        clients = Clients.query.all()
        clients_list = [client.to_dict() for client in clients]
        return make_response(clients_list, 201)
    
    def post(self):
        params = request.json
        try:
            client = Clients(id=params['id'],
                            name=params['name'],
                            phone_number=params['phone_number'],
                            address=params['address'])
            db.session.add(client)
            db.session.commit()
            return make_response(client.to_dict(), 201)
        except Exception as e:
            return make_response(str(e), 400)
    

api.add_resource(Clientses, '/clients')

@app.route('/')
def index():
    return "<h1>Hi there! you're not supposed to see this, dummy!</h1>"

if __name__ == '__main__':
    app.run(port=5555, debug=True)