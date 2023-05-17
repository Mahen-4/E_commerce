import React, { useContext } from "react";
import Axios from 'axios'
import { UserContext } from "./UserContext";

export default function Login(){

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {userDetails, setUserDetails} = useContext(UserContext)
    const [errMSG, setErrMSG] = React.useState("")

    

    const LoginSubmit = async (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3001/log_IN", {username: username, password: password})
        .then((response)=> {
            if(!response.data.auth){
                setErrMSG(response.data.message)
            }
            else{
                setUserDetails({username: response.data.result})
                localStorage.setItem("token", response.data.token)
                setErrMSG("")
            }
    
            
        })
        .catch((err)=> console.log({err:err}))
     
    }
    
    return(
        <div>
            <h1>LOGIN</h1>
            <form>
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
                <input type="submit" value="Login" onClick={LoginSubmit}/>         
            </form>
            {userDetails.username == null ? <h1></h1>: <h1>Welcome {userDetails.username}</h1>}
            <h1>{errMSG}</h1>
        </div>
    )
}