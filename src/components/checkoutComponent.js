import React from 'react'
import CheckOutPage from './cart/CheckOut';
import { Elements } from 'react-stripe-elements';

class CheckOut extends React.Component{



    render(){
        return(
            this.props.isUserInteractingWithBlog
            ?
            null
            :
            <Elements>
                <div id = "checkout" className = "checkout-page"
                style= {{height : `${this.props.PageHeight}px`}}>
                    <div className = "container-fluid">
                        
                        <div className = "row d-flex justify-content-center">
                            <h1>Check Out</h1>                    
                        </div>

                        <CheckOutPage/>
                    
                    </div>
                </div>
             </Elements>
            
        );
    }
}

export default CheckOut