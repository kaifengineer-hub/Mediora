import { useContext } from "react"
import appointmentContext from "./appointmentContext"

import "./Booking.css"
import Header from "./Header"
const Bookings=()=>{
    const {ambulanceData}=useContext(appointmentContext)
    const{hospitals}=useContext(appointmentContext )
    
 
    return(
        <>
        <Header/>
       <div className="Booking-Container">
        {ambulanceData.map((amb,index)=>{
            const hospital=hospitals.find((hosp)=>hosp.name===amb.hospital)
             return(
         <div className="booking-card" key={index}>
  <div className="image-container">
    <img src={hospital.img} alt={amb.hospital} />
  </div>

  <h2>{amb.hospital}</h2>

  <span><strong>Patient Name:</strong> {amb.name}</span>
  <span><strong>Age:</strong> {amb.age}</span>
  <span><strong>Mobile:</strong> {amb.number}</span>

  <h3>Ambulance Type: {amb.ambulanceType}</h3>

  <h4>Pickup Address</h4>

  <span><strong>House:</strong> {amb.pickup.house}</span>
  <span><strong>Street:</strong> {amb.pickup.street}</span>
  <span><strong>Area:</strong> {amb.pickup.area}</span>
  <span><strong>City:</strong> {amb.pickup.city}</span>
  <span><strong>State:</strong> {amb.pickup.state}</span>
  <span><strong>Pincode:</strong> {amb.pickup.pincode}</span>
</div>
        )
        })
       }
       </div>
    
       
        </>
    )
}
export default Bookings