import '../App.css';
import React from 'react';

export default function InventoryProduct(props){


    const deleteProduct = (e)=>{
        const productToDelete = e.target.parentElement
        const productID = productToDelete.dataset.value
        window.localStorage.removeItem(productID);
        window.location.reload(false);

    }

    return(
        <div className='inventoryProduct'>
            <div className='inventoryProduct_card' data-value={props.id}>
                <img src={props.img} alt="" />
                <div className="inventoryProduct_detail">
                    <div >
                    <h1>{props.name}</h1>
                    <p><b>Quantity: </b>{props.quantity}</p>
                    </div>
                    <h2>{props.price}€</h2>
                </div>
                <div className='deleteBTN' onClick={deleteProduct}>DELETE</div>
            </div>
       </div>
    )
}