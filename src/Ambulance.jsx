import { useContext, useState } from "react"

import appointmentContext from "./appointmentContext"
import "./Ambulance.css"
import Header from "./Header"
import axios from "axios"
const Ambulance = () => {
    const { hospitals } = useContext(appointmentContext)
    const { ambulanceData, setAmbulanceData } = useContext(appointmentContext)
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [number, setNumber] = useState("")
    const [ambulanceType, setAmbulanceType] = useState("")
    const [hospital, setHospital] = useState("")
    const [pickup, setPickup] = useState({
        house: "",
        street: "",
        area: "",
        city: "",
        state: "",
        pincode: ""
    })
    const handleSubmit = async () => {
        if (name == "" || age == "" || ambulanceType == "" || pickup.area == ""
            || pickup.state == "" || pickup.house == "" || pickup.pincode == ""
            || pickup.street == "" || pickup.city == "" || hospital == "" || number == ""
        ) {
            alert("Enter complete details")
            return;
        }
        await axios.post("http://localhost:3000/ambulance", {
            name: name,
            age: age,
            ambulanceType: ambulanceType,
            hospital: hospital,
            pickup: {
                house: pickup.house,
                street: pickup.street,
                area: pickup.area,
                city: pickup.city,
                state: pickup.state,
                pincode: pickup.pincode,
            },
            number: number,
        });


        setName("")
        setAge("")
        setHospital("")
        setPickup({
            house: "",
            street: "",
            area: "",
            city: "",
            state: "",
            pincode: ""



        })
        setAmbulanceType("")
        setNumber("")

    }
    const handleChange = (e) => {
        setPickup(

            {
                ...pickup,
                [e.target.name]: e.target.value
            }
        )

    }


    return (
        <>
            <Header />
            <div className="ambulance-formContainer">

                <div className="ammbulance-form">
                    <input type="text"
                        placeholder="Patient name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        value={age}
                        placeholder="Age"
                        onChange={(e) => setAge(e.target.value)}

                    />
                    <input type="number" placeholder="mobile Number" value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <select onChange={(e) => setAmbulanceType(e.target.value)}
                        value={ambulanceType}>
                        <option value="">Select Ambulance</option>
                        <option value="ALS">ALS</option>
                        <option value="BLS">BLS </option>
                        <option value="ICU">ICU</option>
                        <option value="PTA">PTA</option>
                    </select>
                    <div className="adress-field">
                        <input
                            type="text"
                            placeholder="House"
                            name="house"
                            value={pickup.house}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="city"
                            name="city"
                            value={pickup.city}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="street"
                            value={pickup.street}
                            placeholder="Street"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="state"
                            name="state"
                            value={pickup.state}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="area"
                            name="area"
                            value={pickup.area}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="pincode"
                            name="pincode"
                            value={pickup.pincode}
                            onChange={handleChange}
                        />
                    </div>
                    <select onChange={(e) => setHospital(e.target.value)}
                        value={hospital}>
                        <option value="">select hospital</option>
                        {hospitals.map((hosp, ind) => (
                            <option value={hosp.name} key={ind}>{hosp.name}</option>
                        ))}


                    </select>



                    <button onClick={handleSubmit}>BOOK AMBULANCE</button>

                </div>
            </div>
        </>
    )
}
export default Ambulance