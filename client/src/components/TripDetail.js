import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
function TripDetail() {
    const {id} = useParams()
    const [trip, setTrip] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5555/tripss/${id}`)
        .then(res => res.json())
            .then(data => setTrip(data))
    },[id])
    console.log(trip)

    return (
        <div>
            <figure className="details">
                <h2>trip details wooo!!!</h2>
            </figure>
        </div>
    )







}
export default TripDetail