import React, {useState} from "react"
import { useHistory } from "react-router-dom"
import "./TripCard.css"
function TripCard({id, car, driver, location, trip, onDelete}) {

    const handleDelete = () => {
       fetch(`http://localhost:5555/tripss/${id}`, {
        method: 'DELETE'
    }).then(res => {
        if(res.ok){
            history.push('/')
            window.location.reload()
        }
    })
}
    
   const history = useHistory()

    function handleNavigate() {
        history.push(`/trips/${id}`)
    }
    

    return (
        <div className="card" onClick={handleNavigate}>
            <section>
                <button className="trash" onClick={handleDelete}>Delete🗑️</button>
                <div className="info">
                <h3>{car.year} {car.make} {car.model}</h3>
                <p>Assigned to: {driver}</p>
                <p>Pick up from: {location}</p>
                </div>
            </section>
        </div>
    )
    
    

}
export default TripCard