import React from 'react'
import { useSelector } from 'react-redux'
import EmptyCart from './EmptyCart'
import Checkout from './Checkout'

function Cart() {
    const cartItem = useSelector((store)=>store.cart.item)

    return (
    <>
    {
        cartItem?.menu_data === undefined ?
       <EmptyCart/> : <Checkout/>
    }
    </>
  )
}

export default Cart