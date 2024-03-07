
import React, {useContext} from 'react'
import {AppContext} from "./context/AppContext"
import Main from './mainComponent'

const StripeWrapperComponent = () => {
  
    const [cart,setCart] = useContext(AppContext) ; 
 
    return (
      <Main/>
    )
  };

  export default StripeWrapperComponent
  