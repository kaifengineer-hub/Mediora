import "react-router-dom"
import Home from "./Home"
import Appointment from "./components/Appointment"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppointmentData from "./AppointmentData"
import Ambulance from "./Ambulance"
import Bookings from "./Bookings"
import Emergency from "./components/Emergency"
import EmergencyBooking from "./components/EmergencyBooking"
import Sign_in from "./Sign_in"
import { useContext } from "react"
import appointmentContext from "./appointmentContext"
import SignUp from "./SignUp"

const App=()=>{
    return(
      
        <>
         
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/appointment/:id" element={<Appointment/>}/>
                    <Route path="/appointmentData" element={<AppointmentData/>}></Route>
                    <Route path="/ambulance" element={<Ambulance/>}></Route>
                    <Route path="/Bookings" element={<Bookings/>}></Route>
                    <Route path="/emergency/:id" element={<Emergency/>}></Route>
                    <Route path="/emergencyBooking" element={<EmergencyBooking/>}></Route>
                        <Route path="/signin" element={<Sign_in/>}></Route>
                          <Route path="/signup" element={<SignUp/>}></Route>
                        
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default App;