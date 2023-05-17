import '../App.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Navbar(){

    const {userDetails, setUserDetails} = useContext(UserContext)

    const signOut = () => {
        setUserDetails({username: null})
    }
    return(
        <div className='navBar'>
            <Link to="/">
                <h1>LOGO</h1>            
            </Link>
            <Link to="/inventory">
                <h1>Your inventory</h1>            
            </Link>
            
            
           { userDetails.username == null ? 
            <div style={{display: "flex", gap: "50px"}}>
                <Link to="/register">
                    <h1>Register</h1>            
                </Link>
                <Link to="/login">
                    <h1>Login</h1>            
                </Link>
            </div> :
            <div style={{display: "flex", gap: "50px"}}>
                <Link to="/profil"><h1>{userDetails.username}</h1></Link>
                <h1 onClick={signOut} style={{cursor: "pointer"}}>Sign Out</h1>
            </div>
            }
        </div>
    )
}