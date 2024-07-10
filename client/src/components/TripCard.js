import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
function TripCard({id, car, driver, location}) {
//    const handleDelete = () => {
//       fetch(`http://localhost:5555/tripss/${id}`, {
//          method: "DELETE",
//        })
//         .then(res => res.json())
//         .then((trip) => onDelete(trip))
//    }
    
   const navigate = useNavigate()
    
    function handleNavigate() {
        navigate(`/trips/${id}`)
    }

    return (
        <div className="card" onClick={handleNavigate}>
            <section>
                <button className="trash">delete</button>
                <h4>{car.year} {car.make} {car.model}</h4>
                <p>Assigned to: {driver}</p>
                <p>Pick up from: {location}</p>
            </section>
        </div>
    )
    
    

}
export default TripCard