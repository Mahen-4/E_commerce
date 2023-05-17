import '../App.css';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from './UserContext';

export default function OneProduct(){

    const {userDetails} = useContext(UserContext)
    // get url data 
    const params = useParams();
    
    // init states
    const [data, setData] = React.useState([])
    const [images, setImages] = React.useState([])
    const [principalImage, setPrincipalImage] = React.useState("")

    // One time use to get the product with the given ID on the URL
    React.useEffect(()=>{
        Axios.get("http://localhost:3001/products").then((response)=>{
            const datas = response.data.products[params.id - 1]
            setData(datas)
            setImages(datas.images)
          })
    },[])

    // Change Principal img src when mouseEnter 
    const getSomething = (e) => {
        setPrincipalImage(e.target.src)
    }

    // add data to local Storage
    const addLocalStorage = ()=>{
        const productDetails = 
            {
            user: userDetails.username,
            id: `${data.id}`,
            title: `${data.title}`,
            price: `${data.price}`,
            img: `${images[0]}`
            }
        if(userDetails.username != null){
            window.localStorage.setItem(`${data.id}`, JSON.stringify(productDetails));
        }
        
    }

    return(
        <div className='oneProduct'>

            <div className='oneProduct_displayImage'>
                <div className='oneProduct_listImages'>
                {
                    //map images array to display all images
                    images.map((src)=>{
                        return(
                            <img src={src} alt="" onMouseEnter={getSomething} style={{border: "2px solid orange"}} key={src}/>                        
                        )
                    })
                }
                </div>
                <img src={principalImage === "" ? images[0]: principalImage} alt="" className='oneProduct_Image'/>
            </div>
            
            <div className='oneProduct_Details'>
                <h1 className='oneProduct_Name'>{data.title}</h1>
                <p className='oneProduct_Description'><b>Description : </b>{data.description}</p>
                <p><b>Category : </b>{data.category}</p>
                <p><b>Brand : </b>{data.brand}</p>
                <h1>{data.price} €</h1>
                <button className='oneProduct_AddInventory' onClick={addLocalStorage}>ADD TO INVENTORY</button>
            </div>
        </div>
    )
}