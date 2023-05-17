import '../App.css';
import React, { useContext } from 'react';
import InventoryProduct from './InventoryProduct';
import { UserContext } from './UserContext';

export default function Inventory(){

    const {userDetails} = useContext(UserContext)

    const [total, setTotal] = React.useState(0)

    function allStorage() {

        var archive = [],
            keys = Object.keys(localStorage),
            i = 0, key;
        
        for (; key = keys[i]; i++) {
            if(key != "token"){
                let product = JSON.parse(localStorage.getItem(key))
                if(product.user == userDetails.username){
                    archive.push(product)
                }
            }
            
        }
    
        return archive;
    }
    const inventory = allStorage();
    let totalTemp = 0;



    return(
        <div className='inventory'>
            
            <div className='inventoryProductList'>
            {
                inventory.map((item)=>{
                    totalTemp = totalTemp + parseInt(item.price)
                    console.log(totalTemp)
                    return(
                            <InventoryProduct key={item.id} name={item.title} img={item.img} price={item.price} quantity={1} id={item.id} />
                    )
                })
            }
            </div>
            <div className='inventory_total'>
                <h1>TOTAL : {totalTemp  }€</h1>
            </div>
       </div>
    )
}