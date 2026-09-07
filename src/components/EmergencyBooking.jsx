
import "./EmergencyBooking.css"
import Header from "../Header";
import { useContext } from "react";
import appointmentContext from "../appointmentContext";
const EmergencyBooking=()=>{
    const{emergencyData}=useContext(appointmentContext)
    console.log(emergencyData)
    return(
        <>
        <div className="Header-container"><Header/></div>
        <div className="EmergencyBookingcontainer">
        
  {emergencyData?.map((emergency, index) => (
    <div className="emergencyCard" key={index}>

      <img
        src={emergency.img}
        alt={emergency.hospital}
      />

      <h2>{emergency.hospital}</h2>

      <p>
        <strong>📞 Contact:</strong> {emergency.tel}
      </p>

      <p>
        <strong>🚨 Emergency:</strong> {emergency.emergencyType}
      </p>

      <p>
        <strong>📍 Pickup Location:</strong>
      </p>

    {typeof emergency.pickupLocation === "object" ? (
  <div>
    <p>Latitude: {emergency.pickupLocation.latitude}</p>
    <p>Longitude: {emergency.pickupLocation.longitude}</p>
  </div>
) : (
  <p>{emergency.pickupLocation}</p>
)}

      <p>
        <strong>📝 Additional Note:</strong>
      </p>

      <p>
        {emergency.note || "No additional note provided."}
      </p>

      <button className="track-btn">
        Track Ambulance
      </button>

    </div>
  ))}
</div>

               
        
  

        </>
    )
}
export default EmergencyBooking;