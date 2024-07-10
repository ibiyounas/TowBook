# server/models.py
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import func
from config import db, bcrypt  # Ensure correct import path

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    avatar_url = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'User {self.username}, ID {self.id}'

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'avatar_url': self.avatar_url,
            'created_at': self.created_at.isoformat()  # Convert datetime to ISO format string
        }
class Driver(db.Model, SerializerMixin):
    __tablename__ = 'drivers'

    def __repr__(self):
        return f'<Driver {self.name}, ID {self.id}'
    
    serialize_rules = ('-trips', '-clients', 'car')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    trips = db.relationship("Trips", back_populates = "drivers")
    clients = association_proxy("trips", "clients")
    car = association_proxy("trips", "car")

class Car(db.Model, SerializerMixin):
    __tablename__ = 'car'

    def __repr__(self):
        return f'<car make {self.make}, VIN {self.vin}'
    
    serialize_rules = ('-trips', '-clients')
    
    vin = db.Column(db.String, primary_key=True)
    make = db.Column(db.String, nullable = False)
    model = db.Column(db.String, nullable = False)
    year = db.Column(db.Integer, nullable = False)
    owner_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    
    trips = db.relationship("Trips", back_populates = "car")
    #client = association_proxy("trips", "clients")
    clients = db.relationship("Clients", back_populates = "car")

    @validates('make')
    def validate_name(self, key, make):
        if not make:
            raise ValueError('Make cannot be empty')
        elif len(make) > 100:
            raise ValueError('Make cannot be longer than 50 characters')
        return make
    
    @validates('model')
    def validate_name(self, key, model):
        if not model:
            raise ValueError('Model cannot be empty')
        elif len(model) > 100:
            raise ValueError('Model cannot be longer than 50 characters')
        return model
    
    @validates('instructions')
    def validate_instructions(self, key, Year):
        if not Year:
            raise ValueError('Year cannot be empty')
        elif len(Year) > 50:
            raise ValueError('Year cannot be longer than 4 characters')
        return Year
    
class Clients(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    def __repr__(self):
        return f'<name {self.name}, id {self.id}'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    phone_number = db.Column(db.Integer, nullable = False)
    address = db.Column(db.String, nullable = False)   
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name cannot be empty')
        elif len(name) > 100:
            raise ValueError('Name cannot be longer than 50 characters')
        return name
    @validates('phone_number')
    def validate_name(self, key, phone_number):
        if not phone_number:
            raise ValueError('Phone number cannot be empty')
        elif len(phone_number) > 11:
            raise ValueError('Phone Number cannot be longer than 10 digits')
        return phone_number 
    
    car = db.relationship("Car", back_populates = "clients" )
    trips = db.relationship("Trips", back_populates = "clients")

class Trips(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    def __repr__(self):
        return f'<id {self.id}'   
    
    serialize_rules = ('-clients',)

    id = db.Column(db.Integer, primary_key=True)
    car_vin = db.Column(db.String,db.ForeignKey('car.vin'))
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.id')) 
    status = db.Column(db.String, nullable = False)
    pickup_location = db.Column(db.String, nullable = False) 
    dropoff_location = db.Column(db.String, nullable = False)
    completed_at = db.Column(db.DateTime, default=func.now(), nullable = False) 

    clients = db.relationship("Clients", back_populates = "trips")
    car = db.relationship("Car", back_populates = "trips")
    drivers = db.relationship("Driver", back_populates = "trips")
    