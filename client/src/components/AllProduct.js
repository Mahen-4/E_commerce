import "../App.css"
import React, { Component } from "react"

export default class AllProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div className="allproduct">
                <h1 className="allproduct_Name">{this.props.productName}</h1>
                <img className="allproduct_Image" src={this.props.productImage} alt=""/>
                <h2 className="allproduct_Price">{this.props.productPrice}€</h2>
            </div>
        )
    }
}