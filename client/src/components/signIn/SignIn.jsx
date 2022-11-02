import {useState} from "react";
import "./signIn.css";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const SignIn = () =>{

    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [err,setErr] = useState(false);

    const navigate = useNavigate();

    const formHandle =(e)=>{
        e.preventDefault();

        if(email&&password)
        {
            const user = {
                email,
                password
            }

            axios.post('http://localhost:8000/signin',user
                ).then((response)=>{
                if(response.data.status === "error")
                {
                    setErr(true);
                }else if(response.data.status === "ok")
                {
                    localStorage.clear();
                    localStorage.setItem("token", response.data.token);
                    setErr(false);
                    navigate('/');
                }
            })
        }
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
                {err && <p>username or password is incorrect</p>}
                <button type={"submit"}>Sign In</button>
            </form>  
        </div>
    )
}

export default SignIn;