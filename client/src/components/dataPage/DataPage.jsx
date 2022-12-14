import React,{useEffect,useState} from "react"
import {Link} from "react-router-dom";
import "./dataPage.css"
//import {data} from "../data"
import {Pagination} from "@mui/material";
import axios from "axios";

const DataPage = () =>{
    const [persons,setPersons]=useState([]);


    useEffect(()=>{

        const token = localStorage.getItem("token");

        if(token) {
            axios.post("http://localhost:8000/data/", {
                collectionLimit: 10,
                pageNumber: 1
            }, {
                headers:{
                'Authorization': `Bearer ${token}`}
            }).then(res => {
                console.log(res.data);
                setPersons(res.data)
            }).catch((err) => {
                console.error(err);
            })
        }
    },[])

    const pageChangeHandle=(event,value)=>{
        const token = localStorage.getItem("token");

        if(token) {
            axios.post("http://localhost:8000/data/", {
                collectionLimit: 10,
                pageNumber: value
            }, {
                headers:{
                    'Authorization': `Bearer ${token}`}
            }).then(res => {
                console.log(res.data);
                setPersons(res.data)
            }).catch((err) => {
                console.error(err);
            })
        }
    }


    return (
        <div className={"data-page"}>
            <div className={"data-page-header"}>
                <Link to={'/'} className={"main-page-link"}><span className={"data-page-logo"}>Data</span></Link>

            </div>
            <div className={"table"}>
                <div className={"table-header"}>
                    <span className={"name"}>Name</span>
                    <span className={"age"}>Age</span>
                    <span className={"dob"}>DOB</span>
                    <span className={"email"}>Email</span>
                </div>
                { persons.map((data,index) => {
                    return  <div key={index} className={ (index % 2 === 0) ? "table-row white":"table-row pink" }>
                        <span className={"name"}>{data.name}</span>
                        <span className={"age"}>{data.age}</span>
                        <span className={"dob"}>{data.DOB}</span>
                        <span className={"email"}>{data.email}</span>
                    </div>
                    })
                }
            </div>
            <div className={"pagination"}>
                <Pagination count={persons.length} defaultPage={1} siblingCount={0} boundaryCount={2} onChange={pageChangeHandle}/>
            </div>
        </div>
    )
}

export default DataPage;