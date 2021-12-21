import NavComponent from "./NavComponent/NavComponent";
import React from "react";
import {Outlet} from "react-router-dom";


const MainPage = () => {
    return(
        <div className={"w-full h-full flex flex-col"}>
            <div style={{flex:"0.06", width:"100vw"}}>
                <NavComponent/>
            </div>
            <div style={{flex:"0.94", width:"100vw", maxHeight:"94vh"}}>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainPage;
