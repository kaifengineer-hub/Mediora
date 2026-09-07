

import "./App.css"
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import {   useContext, useEffect,  useState } from "react";
import appointmentContext from "./appointmentContext";


const Home=()=>{
    const{loggedIn}=useContext(appointmentContext)
    const[loading,setLoading]=useState(false)
    
    const[hospitals,setHospitals]=useState([])
    const {search}=useContext(appointmentContext)
   
   
  
    const navigate=useNavigate();
    useEffect(() => {
        if(!loggedIn)return;
    const timer = setTimeout(() => {

        let url = search.trim()
            ? `http://localhost:3000/?q=${search}`
            : `http://localhost:3000`;

        const fetchHospital = async () => {
            try {
                setLoading(true);          

                const res = await axios.get(url);

                setHospitals(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);         
            }
        };

        fetchHospital();

    }, 300);

    return () => clearTimeout(timer);

}, [search]);

  
    
return (
    <>
        
        {!loggedIn ?(
            navigate("/signin")


        ):(
          
             loading ? (
            <h2>
                Loading...
            </h2>
        ) : (
              <>
                <Header />
            <div className="hospital-container">
                {hospitals.map((hosp, i) => (
                    <div className="hospital" key={i}>
                        <img src={hosp.img} alt={hosp.name} />
                        <span>{hosp.rating}</span>
                        <span>{hosp.available}</span>
                        <h2>{hosp.name}</h2>

                        <div className="Doctor-Slider">
                            {hosp.doctors.map((doctor, index) => (
                                <div key={index}>
                                    <img src={doctor.img} alt={doctor.name} />
                                    <h3>{doctor.name}</h3>
                                    <p>{doctor.speciality}</p>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => navigate(`/appointment/${hosp._id}`)}>
                            Appointment
                        </button>

                        <button onClick={() => navigate(`/emergency/${hosp._id}`)}>
                            Emergency
                        </button>
                    </div>
                ))}
            </div>
            </>
        )

        )
        }


       
    </>
);
}
export default Home;