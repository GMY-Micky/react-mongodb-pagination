import {useState} from "react";
import "./signIn.css";



const SignIn = () =>{

    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");

    const formHandle =(e)=>{
        e.preventDefault();

        alert(email);
    }

    return (
        <div className={"form-page"}>
            <form onSubmit={formHandle}>
                <h1>Sign In</h1>
                <div className={"input-field"}>
                    <label>Email</label><br/>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className={"input-field"}>
                    <label>Password</label><br/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type={"submit"}>Sign In</button>
            </form>  
        </div>
    )
}

export default SignIn;