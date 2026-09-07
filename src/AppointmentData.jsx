import {  useEffect, useState } from "react"
import "./AppointmentData.css"

import Header from "./Header"
import axios from "axios"

const AppointmentData=()=>{
    const[appointmentData,setAppointmentData]=useState([])
    const handleDelete=async(id)=>{
        await axios.delete(`http://localhost:3000/appointment/${id}`)
        setAppointmentData(prev=>prev.filter(item=>item.id!==id))

    }
    useEffect(()=>{
        const fetchData=async()=>{
            const res=await axios.get("http://localhost:3000/appointment")
            setAppointmentData(res.data)
        }
        fetchData()
     
    },[appointmentData])
   return (
  <>
    <Header />

    <div className="appointments-container">
      <h1 className="page-title">My Appointments</h1>

      {appointmentData.length === 0 ? (
        <h2 className="empty">No appointments found.</h2>
      ) : (
        appointmentData.map((appointment) => (
          <div className="appointment-card" key={appointment._id}>

            <div className="appointment-header">
              <div>
                <h2>👨‍⚕️ Dr. {appointment.doctor}</h2>
                <p>{appointment.speciality}</p>
              </div>

              <span className="status">Confirmed</span>
            </div>

            <div className="appointment-body">

              <div className="info">
                <span>👤 Patient</span>
                <h3>{appointment.name}</h3>
              </div>

              <div className="info">
                <span>🎂 Age</span>
                <h3>{appointment.age}</h3>
              </div>

              <div className="info">
                <span>📅 Appointment Day</span>
                <h3>{appointment.day}</h3>
              </div>

            </div>

            <button
              className="cancel-btn"
              onClick={() => handleDelete(appointment._id)}
            >
              Cancel Appointment
            </button>

          </div>
        ))
      )}
    </div>
  </>
);
}
export default AppointmentData