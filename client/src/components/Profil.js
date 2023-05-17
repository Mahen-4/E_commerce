import React from "react";
import { UserContext } from "./UserContext";
import Axios from "axios"
export default function Profil(){

    const {userDetails} = React.useContext(UserContext)

    const userProfil = ()=>{
        Axios.get("http://localhost:3001/getProfil",{headers:{"x-access-token": localStorage.getItem("token")}}).then((response)=>{console.log(response)})
    }

    return(
        <div>
            {userDetails.username == null ? 
            <div>No profil</div> 
            : 
            <div><button onClick={userProfil}>Get all your secret details</button></div>
            }
        </div>
    )
}