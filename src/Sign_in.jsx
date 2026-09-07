import axios from "axios"
import "./Sign_in.css"
import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import appointmentContext from "./appointmentContext"
const Sign_in=()=>{
    const inputRef=useRef(null);
    const navigate=useNavigate();
    const[userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const {loggedIn,setLoggedIn}=useContext(appointmentContext);
   const handleSubmit = async (e) => {
    e.preventDefault();

    if (userName === "" || password === "") return;

    try {
        const res = await axios.post("http://localhost:3000/login", {
            userName,
            password
        });

        if (res.status === 200) {
            setUserName("")
            setPassword("")
            setLoggedIn(true)
            
            navigate("/");
        }
    } catch (err) {
        alert("Username or password is not correct");
    }
};
    return(
        <>
            <div className="form-container"
            onClick={(e)=>{
                if(  e.target.tagName !== "INPUT" &&
      e.target.tagName !== "LABEL" &&
      e.target.tagName !== "BUTTON"){
        inputRef.current.focus();
      }
            }}>
            <h2 id="mediora">MEDIORA</h2>
                <div className="form">
                <h2 id="login">Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>USERNAME*</label>
                    <input
                    ref={inputRef}
                     type="text" 
                        placeholder="Enter your userName"
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)}
                    />
                       <label>Password*</label>
                    <input type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button type="submit">LOGIN</button>
                    <button
                    type="button"
                     onClick={()=>navigate("/signup")}>create new account</button>
                    </form>

                </div>
            </div>
        </>
    )
}
export default Sign_in;