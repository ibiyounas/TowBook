import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from './Header';
import "./TripDetail.css"
import * as yup from 'yup'
import { Formik } from "formik";
import { useHistory } from "react-router-dom";

function TripDetail(trips) {
    const {id} = useParams()
    const tripId = id-1
    console.log(tripId)
    const trip = trips.trips[tripId]
    console.log(trip)
    const car = trip.car

    const [owner, setOwner] = useState({})
    const history = useHistory()
    const [error, setError] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5555/client/${car.owner_id}`)
        .then(res => res.json())
            .then(data => setOwner(data))
            
        }, [])
        console.log(owner)

            //? Function to handle edit
    function handleEditSubmit(values) {
        const valuesCopy = Object.assign({}, values);
    
        fetch(`http://localhost:5555/client/${car.owner_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(valuesCopy)
            
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setOwner(() => data)
                    history.push(`/`)
                })
            } 
            console.log(values)
        }).catch(error => {
            console.log(error);
            setError(error)
        })
    }


    let editClientSchema = yup.object().shape({
        id: yup.string().max(2, 'Max character limit reached!'),
        name: yup.string().max(20, 'Max character limit reached!').required(),
        phone_number: yup.string().max(11, 'Max character limit reached!').required(),
        address: yup.string().max(35, 'Max character limit reached!')
    })

    return (
        <div className="page">
            <Header />
            <figure className="details">
                <h1>Trip Details</h1>
                <h3>Vehicle Information</h3>
                <p>{car.year} {car.make} {car.model}</p>
                <p>VIN: {trip.car_vin}</p>
                <p>Pick up from: {trip.pickup_location}</p>
                <p>Drop off at: {trip.dropoff_location}</p>
                <p>Status: {trip.status}</p>
                <p>Driver assigned: {trip.drivers.name}</p>
                <h3>Owner Information</h3>
                <p>Name: {owner.name}</p>
                <p>Phone Number: {owner.phone_number}</p>
                <p>Address: {owner.address}</p>
                <p></p>
            </figure>
            <div id="editProfileFormContainer">

<h1 id="editProfileText">Edit Owner information</h1>
<Formik
    initialValues={{
        id: "",
        name: "",
        phone_number: "",
        address: ""
    }}
    validationSchema={editClientSchema}
    onSubmit={handleEditSubmit}
>
    {(props) => {
        console.log(props)
        const { values: {
            id,
            name,
            phone_number,
            address,
            
        },
            handleChange, handleSubmit, errors } = props
            return (<form className="ClientEditForm" onSubmit={handleSubmit}>
                <p>*required fields</p>
                <label>*Client ID: </label>
                <input onChange={handleChange} value={id}
                    type="text" name="id" />
                <p className="errorText">{errors.id}</p>

                <label>*Client Name: </label>
                <input onChange={handleChange} value={name}
                    type="text" name="name" />
                <p className="errorText">{errors.name}</p>

                <label>*Phone Number: </label>
                <input onChange={handleChange} value={phone_number}
                    type="text" name="phone_number" />
                <p className="errorText">{errors.phone_number}</p>

                <label>*Address: </label>
                <input onChange={handleChange} value={address}
                    type="text" name="address" />
                <p className="errorText">{errors.address}</p>
                
                {error ? <p className="registerEditErrorMessage">{error.error}</p> : ""}

            <div id="saveChangesContainer">
                <button id="saveChangesButton" type="submit">Save Changes</button>
            </div>
            </form>)
        }}
    </Formik>
            
        </div>
        </div>
    )







}
export default TripDetail