import '../App.css';
import Axios from "axios"
import React, { Component, useContext } from 'react';
import AllProduct from './AllProduct';
import { Link } from 'react-router-dom';
import { UserContext } from "./UserContext";




export default function Home(){

  const [data,setData] = React.useState([])
  
  const {userDetails, setUserDetails} = useContext(UserContext)

  Axios.defaults.withCredentials = true;

  React.useEffect(()=>{
    
    Axios.get("http://localhost:3001/products").then((response)=>{
      const datas = response.data.products
      setData(datas)
    })

    Axios.get("http://localhost:3001/log_IN")
      .then((response)=>{
          setUserDetails({username: response.data.user})
    })
  },[])


  let testID = 1
  return(
    <div>
        <ul >
            <li className='productList' >
            {data.map(product => (
                <Link to={`/product/${product.id}`} key={product.id}>
                    <AllProduct key={product.id} productName={product.title} productImage={product.images[0]} productPrice={product.price}/>                
                </Link>
            ))}
            </li>
        </ul>
        <Link to={`/product/${testID}`}>
            <h2>TEST</h2> 
        </Link>
    </div>
  )
} 