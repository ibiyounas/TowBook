#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from flask_bcrypt import Bcrypt

# Local imports
from config import app
from models import db, User, Driver, Car, Clients, Trips

if __name__ == '__main__':
    fake = Faker()
    bcrypt = Bcrypt(app)
    with app.app_context():
        print("Starting seed...")
        db.drop_all()
        db.create_all()

        # Seed code goes here!
        user1 = User(username='iyounas', _password_hash=bcrypt.generate_password_hash('flatiron1').decode('utf-8'))
        user2 = User(username='user2', _password_hash=bcrypt.generate_password_hash('password2').decode('utf-8'))
        driver1 = Driver(id = 1, name = "Massab Younas")
        driver2 = Driver(id = 2, name = "Raheel Haider")
        car1 = Car(vin = '3h5f49hg485h', make = 'Acura', model = 'TLX', year = 2009, owner_id = 1)
        car2 = Car(vin = 'jg458j93h50d', make = 'Honda', model = 'Accord', year = 2013, owner_id = 2)
        car3 = Car(vin = 'n3293bg5ui24', make = 'Ford', model = 'Escape', year = 2005, owner_id = 3)
        car4 = Car(vin = '23jf98vj49f5', make = 'Volkswagon', model = 'GTI', year = 2017, owner_id = 4)
        car5 = Car(vin = 'ht53bf53gf73', make = 'BMW', model = 'M3', year = 2022, owner_id = 2)
        client1 = Clients(id = 1, name = 'Maria Smith', phone_number = '7329472758', address = '284 Maple street, Old Bridge NJ')
        client2 = Clients(id = 2, name = 'Stephen Sampson', phone_number = '7328364931', address = '189 Jefferson ave, Rahway NJ')
        client3 = Clients(id = 3, name = 'Ramon Cruz', phone_number = '7328365085', address = '202 Main street, Eatontown NJ')
        client4 = Clients(id = 4, name = 'Jonathan Nunez', phone_number = '7328826752', address = '504 Grove street, Mahwah NJ')

        trip1 = Trips(id = 1, car_vin = '3h5f49hg485h', client_id = 1, driver_id = 1, status = 'en route to client', pickup_location = '284 Maple street, Old Bridge NJ', dropoff_location = '285 2nd street, Paterson NJ')
        trip2 = Trips(id = 2, car_vin = 'jg458j93h50d', client_id = 2, driver_id = 1, status = 'en route to drop', pickup_location = '189 Jefferson ave, Rahway NJ', dropoff_location = '1001 North Oak road, Hopelawn NJ')
        trip3 = Trips(id = 3, car_vin = 'n3293bg5ui24', client_id = 3, driver_id = 2, status = 'en route to client', pickup_location = '202 Main street, Eatontown NJ', dropoff_location = '418 Bleecker street, Bergen NJ')
        trip4 = Trips(id = 4, car_vin = '23jf98vj49f5', client_id = 4, driver_id = 2, status = 'en route to drop', pickup_location = '504 Grove street, Mahwah NJ', dropoff_location = '93 Middlesex ave, Westfield NJ')

        db.session.add(trip1)
        db.session.add(trip2)
        db.session.add(trip3)
        db.session.add(trip4)

        db.session.add(client1)
        db.session.add(client2)
        db.session.add(client3)
        db.session.add(client4)

        db.session.add(car1)
        db.session.add(car2)
        db.session.add(car3)
        db.session.add(car4)
        db.session.add(car5)
        
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(driver1)
        db.session.add(driver2)
        db.session.commit()