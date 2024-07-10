import React, { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import Header from './Header'
import { Formik } from "formik";
import * as yup from 'yup';
import './NewTrip.css';

function NewTrip (trips, setTrips, cars, setCars, clients, setClients) {
    const [error, setError] = useState("")
    

    function handleCarSubmit(values) {
        console.log(values)
        fetch('http://localhost:5555/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setCars([...cars, data])
                })
            }
        })
    }

    function handleClientSubmit(values) {
        console.log(values)
        fetch('http://localhost:5555/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setClients([...clients, data])
                })
            }
        })
    }
    function handleTripSubmit(values) {
        console.log(values)
        fetch('http://localhost:5555/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setTrips([...trips, data])
                })
            }
        })
    }


    let createCarSchema = yup.object().shape({
        make: yup.string().max(20, 'Character limit reached!').required(),
        model: yup.string().max(20, 'Character limit reached!').required(),
        year: yup.string().max(5, 'Character limit reached!').required(),
        vin: yup.string().max(13, 'Character limit reached!').required(),

})

    let createClientSchema = yup.object().shape({
        id: yup.string().max(2, 'Character limit reached!').required(),
        name: yup.string().max(20, 'Character limit reached!').required(),
        phone_number: yup.string().max(11, 'Character limit reached!').required(),
        address: yup.string().max(33, 'Character limit reached!').required(),

})

    let createTripSchema = yup.object().shape({
        id: yup.string().max(2, 'Character limit reached!').required(),
        car_vin: yup.string().max(15, 'Character limit reached!').required(),
        client_id: yup.string().max(2, 'Character limit reached!').required(),
        driver_id: yup.string().max(3, 'Character limit reached!').required(),
        status: yup.string().max(50, 'Character limit reached!').required(),
        pickup_location: yup.string().max(50, 'Character limit reached!').required(),
        dropoff_location: yup.string().max(50, 'Character limit reached!').required(),
})

    return (
        <div>
        <Header />
        <div className="indent">
        <h1 className="create">Create Trip</h1>
        <h2>Vehicle information</h2>
        <Formik
                initialValues={{
                    make: "",
                    model: "",
                    year: "",
                    vin: "",
                    owner_id: ""
                }}
                validationSchema={createCarSchema}
                onSubmit={handleCarSubmit}
            >
                {(props) => {
                    const { values: {
                        make,
                        model,
                        year,
                        vin,
                        owner_id
                    },
                        handleChange, handleSubmit, errors } = props
                        return (<form className="newCarForm" onSubmit={handleSubmit}>
                            <p>*required fields</p>
                            <label>*Make: </label>
                            <input onChange={handleChange} value={make}
                                type="text" name="make" />
                            <p className="errorText">{errors.make}</p>
    
                            <label>*Model: </label>
                            <input onChange={handleChange} value={model}
                                type="text" name="model" />
                            <p className="errorText">{errors.model}</p>
    
                            <label>*Year: </label>
                            <input onChange={handleChange} value={year}
                                type="text" name="year" />
                            <p className="errorText">{errors.year}</p>
    
                            <label>*Vin: </label>
                            <input onChange={handleChange} value={vin}
                                type="text" name="vin" />
                            <p className="errorText">{errors.vin}</p>
    
                            <label>*Owner ID: </label>
                            <input onChange={handleChange} value={owner_id}
                                type="text" name="owner_id" />
                            <p className="errorText">{errors.owner_id}</p>
    
                            {error ? <p className="CreateErrorMessage">{error.error}</p> : ""}
    
                            <button type="submit">Add Vehicle</button>
    
    
                        </form>)
                    }}
                </Formik>
            <h2>Client information</h2>
        <Formik
                initialValues={{
                    id: "",
                    name: "",
                    phone_number: "",
                    address: ""
                }}
                validationSchema={createClientSchema}
                onSubmit={handleClientSubmit}
            >
                {(props) => {
                    const { values: {
                        id,
                        name,
                        phone_number,
                        address
                    },
                        handleChange, handleSubmit, errors } = props
                        return (<form className="newClientForm" onSubmit={handleSubmit}>
                            <p>*required fields</p>
                            <label>*Client ID: </label>
                            <input onChange={handleChange} value={id}
                                type="text" name="id" />
                            <p className="errorText">{errors.id}</p>
    
                            <label>*Name: </label>
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
    
                            {error ? <p className="CreateErrorMessage">{error.error}</p> : ""}
    
                            <button type="submit">Add Client</button>
    
    
                        </form>)
                    }}
                </Formik>
            <h2>Trip information</h2>
            <Formik
                initialValues={{
                    id: "",
                    car_vin: "",
                    client_id: "",
                    driver_id: "",
                    status: "",
                    pickup_location: "",
                    dropoff_location: ""
                }}
                validationSchema={createTripSchema}
                onSubmit={handleTripSubmit}
            >
                {(props) => {
                    const { values: {
                        id,
                        car_vin,
                        client_id,
                        driver_id,
                        status,
                        pickup_location,
                        dropoff_location
                    },
                        handleChange, handleSubmit, errors } = props
                        return (<form className="newTripForm" onSubmit={handleSubmit}>
                            <p>*required fields</p>
                            <label>*Trip ID: </label>
                            <input onChange={handleChange} value={id}
                                type="text" name="id" />
                            <p className="errorText">{errors.id}</p>
    
                            <label>*Vehicle VIN: </label>
                            <input onChange={handleChange} value={car_vin}
                                type="text" name="car_vin" />
                            <p className="errorText">{errors.car_vin}</p>
    
                            <label>*Driver ID: </label>
                            <input onChange={handleChange} value={driver_id}
                                type="text" name="driver_id" />
                            <p className="errorText">{errors.driver_id}</p>

                            <label>*Client ID: </label>
                            <input onChange={handleChange} value={client_id}
                                type="text" name="client_id" />
                            <p className="errorText">{errors.client_id}</p>
    
                            <label>*Status: </label>
                            <input onChange={handleChange} value={status}
                                type="text" name="status" />
                            <p className="errorText">{errors.status}</p>
    
                            <label>*Pickup Location: </label>
                            <input onChange={handleChange} value={pickup_location}
                                type="text" name="pickup_location" />
                            <p className="errorText">{errors.pickup_location}</p>
                            
                            <label>*Drop Off Location: </label>
                            <input onChange={handleChange} value={dropoff_location}
                                type="text" name="dropoff_location" />
                            <p className="errorText">{errors.dropoff_location}</p>
    
                            {error ? <p className="CreateErrorMessage">{error.error}</p> : ""}
    
                            <button type="submit">Add Trip</button>
    
    
                        </form>)
                    }}
                </Formik>
                </div>
        </div>
        
    )
}

export default NewTrip