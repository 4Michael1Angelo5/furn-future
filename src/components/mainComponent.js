
import React, {useContext} from 'react'
import {AppContext} from "./context/AppContext"
import Home from './homeComponent'

const Main = () => {
    const [cart,setCart] = useContext(AppContext) ; 
    console.log(cart)
    return (
      <Home/>
    )
  };

  export default Main
  