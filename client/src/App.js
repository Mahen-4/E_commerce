import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from './components/Home';
import OneProduct from './components/OneProduct';
import Navbar from './components/Navbar';
import Inventory from './components/Inventory';
import Payments from './components/payments';
import Register from './components/Register';
import Login from './components/Login';
import { UserContext } from './components/UserContext';
import React from 'react';
import Profil from './components/Profil';

export default function App(){

  const [userDetails, setUserDetails] = React.useState({username:null})

  return(
    <div className='App'>
      <UserContext.Provider value={{userDetails, setUserDetails}}>
        <Navbar />
        <Routes>
          
            <Route path='/' element={<Home />}/>
            <Route path='/product/:id' element={<OneProduct />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/payments' element={<Payments />} />
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/profil' element={<Profil />} />
        </Routes>
      </UserContext.Provider>
    </div>
  )
}