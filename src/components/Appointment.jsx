import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import "./Appointment.css";
import appointmentContext from "../appointmentContext";
import Header from "../Header";
import axios from "axios";

const Appointment = () => {
    const{appointmentData,setAppointmentData}=useContext(appointmentContext)
  const [name, setName] = useState("");
  const [hospital,setHospital]=useState(null)
  const [age, setAge] = useState("");
  const [doctor, setDoctor] = useState("");
  const [day, setDay] = useState("");

  const { id } = useParams();
  useEffect(()=>{
    const fetchData=async()=>{
      const res=await axios.get("http://localhost:3000/")
    const hospitals= res.data
     setHospital(hospitals.find((item)=>item._id==id))
  

    }
    fetchData()
     

    
    
  },[id])

  
  const handleSubmit=async()=>{
    if(name===""||age==""||doctor==""||day=="")return
    await axios.post("http://localhost:3000/appointment",{
      name:name,
      age:age,
      doctor:doctor,
      day:day
    })
   

    setName("")
    setAge("")
    setDoctor("")
    setDay("")
  }

  return (
    <>
     <Header/>
    <div className="appointment-container">
  
      <div className="appointment-card">
        <h2 className="appointment-heading">Book Appointment</h2>

        <input
          className="appointment-input"
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="appointment-input"
          type="number"
          placeholder="Enter Your Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <select
          className="appointment-select"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>

        <select
          className="appointment-select"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <option value="">Select Doctor</option>

          {hospital?.doctors.map((doc, ind) => (
            <option key={ind} value={doc.name}>
              {doc.name}
            </option>
          ))}
        </select>

        <button className="appointment-btn" onClick={handleSubmit}>
          Book Appointment
        </button>
      </div>
    </div>
    </>
  );
};

export default Appointment;