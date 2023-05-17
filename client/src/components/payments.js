import '../App.css';
import React from 'react';
import Axios from 'axios';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51MYrdYI98EnNNqKyWjPkrUXdJgbknaNl2xf6tjgozW2b3UvsbtcIiW0SVx5TRbWKIThJlXjaQWs6QXVdSe8Xv9Cg00nlL6R8qv');

export default function Payments(){

    window.addEventListener("DOMContentLoaded", async()=>{
        const {clientSecret2} = await fetch("http://localhost:3001/create-payment-intent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
    
        }).then(r=> r.json())
        return(
            <div>
                <Elements stripe={stripePromise} options={clientSecret2}>
                    <CheckoutForm />
                </Elements>
            </div>
        )
    })
    


    
}