import axios from "axios"
import "./SignUp.css"
import { useState,useRef } from "react"
import { useNavigate } from "react-router-dom"

const SignUp=()=>{
    const firstInputRef = useRef(null);
    const[userName,setUserName]=useState("")
    const[password,setPassword]=useState("")
    const[password1,setPassword1]=useState("")
    const navigate=useNavigate()
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
        if(userName===""||password===""||password1===""){
        alert("filling all fields are mandatory")
    }
    if(password.trim().length<=7||userName.trim().length<=3){
        if(password.trim().length<=7){
            return alert("password must contain 8 character")
        }
        return alert("username must contain 4 character")
       

    }
    if(password.includes(" ")||userName.includes(" ")){
        return alert("spaces are not allowed in username and password")
    }
        if(password!==password1){
            return alert("password not matched")
        }

        
       const res= await axios.post("http://localhost:3000/signup",{
            userName,
            password
        })
         if(res.status=== 201){
            alert("user signUp Successful")
            setPassword("")
            setUserName("")
            navigate("/signIn")
        }
    }catch(err){
        if(err.response?.status=== 409){
            alert("username already exist")
        }else{
            console.log(err)
             alert("internal server error")

        }
       
    }
    }
    return(
        <>
            <div className="form-container" 
                         onClick={(e) => {
    if (
      e.target.tagName !== "INPUT" &&
      e.target.tagName !== "LABEL" &&
      e.target.tagName !== "BUTTON"
    ) {
      firstInputRef.current.focus();
    }
  }}>
            <h1 id="mediora">MEDIORA</h1>
                <div className="form"   
   >
                <h2 id="create">Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <label>USERNAME*</label>
                        <input
                          ref={firstInputRef}
                            type="text"
                            placeholder="ENTER USERNAME"
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}

                        />
                        <label>Password*</label>
                        <input type="password"
                        placeholder="ENTER PASSWORD"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <label>Re-Enter password*</label>
                        <input
                            type="password"
                            placeholder="RE-ENTER PASSWORD"
                            value={password1}
                            onChange={(e)=>setPassword1(e.target.value)}
                        />
                        <button type="submit">CREATE ACCOUNT</button>

<button
    type="button"
    onClick={() => navigate("/signin")}
>
    Already have an account? Login
</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignUp