import React from "react"
import "./mainPage.css"
import pages from "../assets/Group 1.png"
import liningShape from "../assets/—Pngtree—creative vector dotted line dotted_6030768 1.png"
import {Link} from "react-router-dom";

const MainPage = ()=>{

    return (
        <div className={"main-page"}>
            <div className={"main-header"}>
                <span className={"logo"}>Data</span>
                <div className={"header-content"}>
                  <img src={pages} alt={"pages-img"} className={"pages-img"}/>
                    <div className={"text-content"}>
                        <span className={"heading-upper-line"}>Pagination using </span>
                        <br/>
                        <span className={"heading-lower-line"}>React
                            <span className={"and"}>&</span>
                            MongoDB</span>
                        <br/><br/>
                        <Link to={"/pages"} className={"pages-button"}>Pages</Link>
                    </div>
                </div>
            </div>
            <div className={"rectangle"}>

            </div>
            <img src={liningShape} alt="" className={"shape"}/>
            <p className={"text-bottom"}>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>
        </div>
    )
}

export default MainPage;