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

  useEffect(() => {
    fetch(`http://localhost:5555/trips`)
    .then(res => res.json())
        .then(data => setTrips(data))
        
    }, [])
    console.log(trips)
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={() => <HomePage trips = {trips} />} />
        <Route path="/profile" component={Profile} />
        <Route path="/create_trip" component={NewTrip} />
        <Route path="/login" component={Login} />
        <Route path="/trips/:id" component={TripDetail} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </AuthProvider>
  );
}

export default App;