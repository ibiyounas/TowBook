// src/components/HomePage.js
import React from 'react';
import Header from './Header';
import { useParams } from "react-router-dom"
import './HomePage.css';
import TripCard from './TripCard';


const HomePage = (trips, onDelete) => {
    //const {make, year, image, info} = trips

  
  const trip_array = trips.trips
  console.log(trip_array)
  const tripCard = trip_array.map((trip) => {
    return <TripCard key={trip.id} car = {trip.car} id = {trip.id} driver = {trip.drivers.name} location = {trip.pickup_location} onDelete={onDelete} trip = {trip}/>
  })
  console.log (trips.length)
  return (
    <div className="homepage">
      <Header />
      <div className="banner">
        <h2>Welcome Back!</h2>
        <h4>Jobs currently active: {trip_array.length}</h4>
      </div>
      <div className="row">
        <h2>Active Jobs</h2>
        <div className="row-posters">
        {tripCard}
        </div>
      </div>
      <div className="row">
        <h2></h2>
        <div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;