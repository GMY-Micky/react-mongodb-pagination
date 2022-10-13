import React from "react"
import "./dataPage.css"
import {data} from "../data"
import {Pagination} from "@mui/material";

const DataPage = () =>{

    return (
        <div className={"data-page"}>
            <div className={"data-page-header"}>
                <span className={"data-page-logo"}>Data</span>
            </div>
            <div className={"table"}>
                <div className={"table-header"}>
                    <span className={"name"}>Name</span>
                    <span className={"age"}>Age</span>
                    <span className={"dob"}>DOB</span>
                    <span className={"email"}>Email</span>
                </div>
                { data.map((data,index) => {
                    return  <div className={ (index % 2 === 0) ? "table-row white":"table-row pink" }>
                        <span className={"name"}>{data.name}</span>
                        <span className={"age"}>{data.age}</span>
                        <span className={"dob"}>{data.DOB}</span>
                        <span className={"email"}>{data.email}</span>
                    </div>
                    })
                }
            </div>
            <div className={"pagination"}>
                <Pagination count={data.length} defaultPage={1} siblingCount={0} boundaryCount={2} />
            </div>
        </div>
    )
}

export default DataPage;