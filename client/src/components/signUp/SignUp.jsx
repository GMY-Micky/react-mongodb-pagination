import {useState} from "react";
import "./signUp.css";
import { CiCircleAlert,CiCircleCheck } from "react-icons/ci";
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const SignUp = () =>{

    const navigate = useNavigate();

    const [email,setEmail]= useState("");
    const [duplication,setDuplication] = useState(false);
    const [emailIcon, setEmailIcon]=useState(false);
    const [password,setPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");
    const [passwordIcon,setPasswordIcon] = useState(false);
    const [fullName,setFullName] = useState("");
    const [dateOfBirth,setDateOfBirth] = useState("");
    const regex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const formHandle =(e)=>{
        e.preventDefault();

        setDuplication(false);
        if(fullName && email && password && confirmPassword && (password === confirmPassword) && dateOfBirth)
        {
            const user = {
                email,
                password,
                name:fullName,
                DOB:dateOfBirth,
            }

            axios.post("http://localhost:8000/signup",
            user
            ).then((response) => {
                console.log(response.data);
            if(response.data.status === "error")
            {
                setDuplication(true);
            }
            else if(response.data.status === "ok")
            {
                navigate('/signin');
            }
        })
        }


    }

    const emailCheck = (e)=>{
        setEmail(e.target.value);
        if(regex.test(email)) {
            setEmailIcon(true);
        }
        else {
            setEmailIcon(false);
        }

    }

    const checkPassword =(e)=>{
        setConfirmPassword(e.target.value);
        if(e.target.value === password)
            setPasswordIcon(true);
        else
            setPasswordIcon(false);

    }


    return (
        <div className={"form-page"}>
            <form onSubmit={formHandle}>
                <h1>Sign Up</h1>

                <div className={"input-field"}>
                    <label>Full name</label><br/>
                    <input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
                </div>
                <div className={"input-field"}>
                    <label>Email</label><br/>
                    <div className={"email-field"}>
                        <input type="email" value={email} onChange={emailCheck}/>
                        {emailIcon?<CiCircleCheck className={"check"}/>:<CiCircleAlert className={"alert"}/> }
                    </div>
                </div>
                <div className={"input-field"}>
                    <label>Password</label><br/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className={"input-field"}>
                    <label>Confirm Password</label><br/>
                    <div className={"pass-field"}>
                        <input type="password" value={confirmPassword} onChange={checkPassword}/>
                        {passwordIcon?<CiCircleCheck className={"check"}/>:<CiCircleAlert className={"alert"}/>}
                    </div>
                </div>
                <div className={"date-of-birth"}>
                    <label>Date of Birth</label>
                    <input type="date" value={dateOfBirth} onChange={e=>setDateOfBirth(e.target.value)}/>
                </div>
                {duplication && <p>User Already Exist</p>}
                <button disabled={!(emailIcon && passwordIcon)} type={"submit"}>Submit</button>
            </form>
        </div>
    )
}

export default SignUp;