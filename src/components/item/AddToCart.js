import React from "react";
import axios from "axios";
import {useState} from "react";
import { render } from "react-dom";

function Cart(){
    const [cart, setCart]=useState([]);

    const addToCart = (items)=>{
    console.log('we are in add to cart')
    setCart([...cart,items])
}

render()
{
    return(
        addToCart
    )
}

}




export default Cart ;
