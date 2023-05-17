import React from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';
export default function Register(){

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const registerSubmit = async (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3001/registering", {username: username, password: password})
        .then((response)=> console.log(response))
        .catch((err)=> console.log(err))
     
    }
    return(
        <div>
            <h1>REGISTER</h1>
            <form>
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
                
                <Link to="/login">
                    <input type="submit" value="Register" onClick={registerSubmit}/>            
                </Link>
            </form>
        </div>
    )
}