import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "./Emergency.css"
import Header from "../Header"
import appointmentContext from "../appointmentContext";
import axios from "axios";
const Emergency=()=>{
    const navigate=useNavigate()
    const{setEmergencyData,hospitals}=useContext(appointmentContext)
    
  
  
    const {id}=useParams()
    
    const hospital= hospitals.find((i)=>i._id==id)
   
    const [location,setLocation]=useState(null)
    
    const[emergencyType,setEmergencyType]=useState("")
    const[manualLocation,setManualLocation]=useState("")
    const [tel,setTel]=useState("")
    const [note,setNote]=useState("")
   
    
    const getLocation=()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocation({
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
            })
        },(error)=>{
            console.log(error.message)
        }
    
    )
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(emergencyType==""||tel=="")return
        else if(manualLocation==""&&location==null)return
        const pickupLocation=manualLocation||location
await axios.post("http://localhost:3000/emergency", {
  hospital: hospital.name,
  img:hospital.img,
  emergencyType,
  pickupLocation,
  tel,
  note
});
setEmergencyType("")
setManualLocation("")
setLocation(null)
setNote("")
setTel("")
navigate("/")

        
       
        
        


    }

    return (
        <>
        <div className="HEADER"><Header/></div>
  <div className="Emergency-container">
 
  

    <div className="hospital-details">
      <img src={hospital?.img} alt={hospital?.name} />
      <h1>{hospital?.name}</h1>
    </div>

    <form className="emergency-form">

      <h2>🚨 Request an Ambulance</h2>

     
      <div className="input-group">
        <label>Contact Number *</label>
        <input
        value={tel}
        onChange={(e)=>setTel(e.target.value)}
          type="tel"
          placeholder="Enter your phone number"
          required
        />
      </div>

    
      <div className="input-group">
        <label>Pickup Location *</label>
          
        <button
          type="button"
          onClick={getLocation}
        >
          📍 Share Current Location
        </button>

        {location && (
          <p>
            Location Shared Successfully ✅
          </p>
        )}

        <p>OR</p>

        <textarea
          rows="3"
          placeholder="Enter your address manually"
          value={manualLocation}
          onChange={(e)=>setManualLocation(e.target.value)}
        ></textarea>
      </div>

      <div className="input-group">
        <label>Emergency Type *</label>

        <select required value={emergencyType} onChange={(e)=>setEmergencyType(e.target.value)}>
          <option value="">Select Emergency</option>
          <option>Road Accident</option>
          <option>Heart Attack</option>
          <option>Breathing Problem</option>
          <option>Pregnancy</option>
          <option>Burn Injury</option>
          <option>Stroke</option>
          <option>Poisoning</option>
          <option>Other</option>
        </select>
      </div>

      <div className="input-group">
        <label>Additional Note (Optional)</label>

        <textarea
        value={note}
        onChange={(e)=>setNote(e.target.value)}
          rows="3"
          placeholder="Example: Patient unconscious, Gate No. 2, 4th Floor"
        ></textarea>
      </div>

      <button className="request-btn" type="submit" onClick={handleSubmit}>
        🚑 Request Ambulance
      </button>

    </form>

  </div>
  </>
);
}
export default Emergency;