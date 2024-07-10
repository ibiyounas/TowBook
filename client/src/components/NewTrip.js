import React, { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import Header from './Header'
function NewTrip () {

    return (
        <div>
        <Header />
        <form className="form" >
            <label htmlFor="name">
                Car Make: 
            </label>
            <input id="name" type="text"/>
      
            <label htmlFor="year">
                Car Model: 
            </label>
            <input id="year" type="text"/>
       
            <label htmlFor="diretor">
                Car Year: 
            </label>
            <input id="director" type="text"/>
        
            <label htmlFor="image">
                Car Vin: 
            </label>
            <input id="image" type="text" />
       
            <label htmlFor="info">
                Customer Name: 
            </label>
            <input id="info" type="text" />
            <button type="submit" value="create movie">Add Trip</button>
        </form>
        </div>
        
    )
}
export default NewTrip