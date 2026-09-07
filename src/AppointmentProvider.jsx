import { useState,useEffect } from "react"
import appointmentContext from "./appointmentContext"
import axios from "axios"

const AppointmentProvider=({children})=>{
    const [appointmentData,setAppointmentData]=useState([])
    const [ambulanceData,setAmbulanceData]=useState([])
    const [emergencyData,setEmergencyData]=useState([])
    const [hospitals,setHospitals]=useState([])
    const [search,setSearch]=useState("")
    const [loggedIn,setLoggedIn]=useState(false)
     useEffect(
        ()=>{
            const fetchHospital=async()=>{
                const res=await axios.get(`http://localhost:3000/`)
                setHospitals(res.data)
            }
            
            const fetchAmbulance=async()=>{
                const res=await axios.get("http://localhost:3000/ambulance")
                setAmbulanceData(res.data)
            }
            const fetchEmergency=async()=>{
                const res= await axios.get("http://localhost:3000/emergency")
                setEmergencyData(res.data)

            }
            fetchHospital()
            fetchAmbulance()
            fetchEmergency()

        },[ambulanceData,emergencyData]
    )
  
    return(
        <appointmentContext.Provider value={{appointmentData,setAppointmentData,ambulanceData,setAmbulanceData,setEmergencyData,emergencyData,hospitals,
        search,setSearch,loggedIn,setLoggedIn}}>
            {children}
        </appointmentContext.Provider>

    )
}
export default AppointmentProvider