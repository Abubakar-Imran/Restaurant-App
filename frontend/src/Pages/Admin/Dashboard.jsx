import React, { useState, useEffect } from 'react'
import { dishes } from '../../dishes.json'
import axios from 'axios'


export default function Dashboard() {
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/restaurant/reservation/get')     
                setReservations(data.reservations)
            } catch (error) {
                console.log(error)
            }
        }
        fetchReservations()
    },[])

    const handleDelete = (id) => {
        return async () => {
            try {
                await axios.delete(`http://localhost:4000/restaurant/menu/delete_dish/${id}`)
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <section className='menu' id='menu'>
                <div className="container">
                    <div className="heading_section">
                        <h1 className="heading">DISHES</h1>
                        <button className='add-dish'>Add dish</button>
                    </div>
                    <div className="dishes_container">
                        {
                            dishes.map(element => (
                                <div className="card" key={element.id}>
                                    <img src={element.image} alt={element.title} />
                                    <h3>{element.title}
                                        <button className='delete-dish' onClick={handleDelete(element.id)}>Delete</button>
                                    </h3>
                                    <button className='category'>{element.category}</button>
                                    <button className='update-dish'>Update</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className='menu' id='menu'>
                <div className="container">
                    <div className="heading_section">
                        <h1 className="heading">RESERVATIONS</h1>
                    </div>
                    <div className="dishes_container">
                        {
                            reservations.map(element => (
                                <div className="card">
                                    <h3>First Name: {element.firstName}</h3>
                                    <h3>Last Name:{element.lastName}</h3>
                                    <h3>Email: {element.email}</h3>
                                    <h3>Phone: {element.phone}</h3>
                                    <h3>Date: {element.date}</h3>
                                    <h3>Time: {element.time}</h3>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
