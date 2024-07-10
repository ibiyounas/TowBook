// src/components/App.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Profile from './Profile';
import Login from './Login';
import NewTrip from './NewTrip';
import TripDetail from './TripDetail';
import { AuthProvider } from '../AuthContext';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [trips, setTrips] = useState([])
  const [cars, setCars] = useState({})
  const [clients, setClients] = useState({})

  useEffect(() => {
    fetch(`http://localhost:5555/trips`)
    .then(res => res.json())
        .then(data => setTrips(data))
        
    }, [])
    console.log(trips)

    useEffect(() => {
      fetch(`http://localhost:5555/cars`)
      .then(res => res.json())
          .then(data => setCars(data))
          
      }, [])
      console.log(cars)

    useEffect(() => {
      fetch(`http://localhost:5555/clients`)
      .then(res => res.json())
          .then(data => setClients(data))
          
      }, [])
      console.log(clients)

    const onAddTrip = (newTrip) => {
      setTrips([...trips, newTrip])
    }
    const onDelete= (data) => {
      const getTrips = trips.filter(trip => trip.id !== data.id)
      setTrips(getTrips)
    };

    

  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={() => <HomePage trips = {trips} onDelete = {onDelete}/>} />
        <Route path="/profile" component={Profile} />
        <Route path="/create_trip" component={() => <NewTrip trips = {trips} setTrips={setTrips} cars = {cars} setCars={setCars} clients = {clients} setClients={setClients} />} />
        <Route path="/login" component={Login} />
        <Route path="/trips/:id" component={() => <TripDetail trips = {trips} />} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </AuthProvider>
  );
}

export default App;