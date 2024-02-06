
import React,{useContext,useState} from 'react';
import {Popover,Button, PopoverBody} from 'reactstrap';
import {addFirstProduct, updateCart} from './functions'
import {AppContext} from '../context/AppContext';
import cartIcon from '../../shared/icons/cart.png'

const CartSuccess = (props) => {

    // console.log(props.cart)

    const itemsInCartNumber = props.cart ? props.cart.totalProductsCount : 0 ;

    // pass in css classes to show cart icon if user clicks add-to-cart-btn and action is allowable

    const show = props.animate? 'slide-in-out' : ' ';

    const shake = props.animate ? 'attention-seeker' : ' '; 

    return(
        <div className = 'row d-flex justify-content-center'>
            <div className = {`${show} cart-sucess`}> 
                <div className = 'col-3 mt-4 pb-2'>
                <span className = {`${shake} cart-badge`} >{itemsInCartNumber}</span>
                    <img src = {cartIcon} width = '100%'/>
                 
                </div>
            </div>        
        </div>
    );
}


const ViewCartButton = ()=>{

    var checkoutPage = document.getElementById('checkout'); 

    const scrollToView = ()=> checkoutPage.scrollIntoView({behavior: "smooth"});

    
    if (process.browser) {
        let existingCart = localStorage.getItem('cedarcreekforestry-cart');
        if (existingCart) {

            return(
                <div className = "text-center cart-action-btn view-cart-btn" onClick={scrollToView}>
                     VIEWCART
                </div>
           
            );

        }
        return null
    
    }
    return null

}

 


const AddToCartButton = (props) => {

    const { product } = props; 
    const [cart,setCart] = useContext(AppContext);   

    const [message,setMessage] = useState("Sorry, item either out of stock or the requested amount exceeds inventory") ; 
    const [pop,setPop] = useState(false);


    const toggle = (e,onBlur) => {

        // prevent pop up from shwowing on every click
        e.preventDefault()
        // hack to enable trigger = 'focus'
        if (onBlur){
            setPop(false)
        }
        else
        setPop(!pop)
         
        // Determin the message (reason action can not be completed) 

            if (checkIfAvailable(product)[1] === 'OUT_OF_STOCK' ){
    
                setMessage('Sorry, item out of stock ')
            }
            else 
            setMessage(`Sorry, only ${product.stockQuantity === null ? 1: product.stockQuantity } available`)     
    
        
    }

    const [animate, setAnimate] = useState(false);

    const toggleAnimate = () => {

        setAnimate(false);
        
    }


    const indexOfProductInCart = (product) => {

      

         if (cart){
            const index = cart.products.map(product => product.productId).indexOf(product.productId)
   
            
            return(index)

         }
         else return -1

    }

    const checkIfAvailable = (product) => {
        
         
        

        // check if item is in stock
        if(product.stockStatus === 'IN_STOCK'){

            let existingCart = localStorage.getItem('cedarcreekforestry-cart');
            existingCart = JSON.parse(existingCart);
            console.log("existing cart",existingCart)

            // check if cart exists
            if (existingCart){

                // check if item already in cart
                if ( indexOfProductInCart(product) > -1) {

                
                    // check if amount requested is available
                    if (existingCart.products[indexOfProductInCart(product)].qty === product.stockQuantity || product.stockQuantity === null){
                            
                        // if quantity of product in cart is equal to the stock quantity 
                        // or if stockQuantity is null (ie Sterling forgot to add quantity)
                        // disallow adding it to cart then
                        
                         
                         return [false,'MAX']
                         

                    }
                    // item in cart but requested amount is available
                    else return [true,'allow']


                }
                // item not in cart but item in stock
                // allow user to add item to cart
                else return  [true,'allow']
                

            }
            //  if cart does not exist but item in stock
            //  allow user to add item
            else return [true,'allow']


        }
        // item not in stock
        else {

            return [false,'OUT_OF_STOCK']
        }
        
        
    }

    const handleFinishTypes = () => {

        console.log('handleAddToCartClick was successfully rerouted to handleFinishTypes with props')

        //  @TODOS 
        //  funtion will take dimensions of a cut as props
        //  and calculate surface area of object. 
        //  This will be then used to calculate qtyToBeAdded 
        //  parameter in setCart function

        

        let existingCart = localStorage.getItem('cedarcreekforestry-cart');

        if(existingCart){


            let surfaceArea = props.surfaceArea ; 
            existingCart = JSON.parse(existingCart);

            const qtyToBeAdded = surfaceArea;
                        
            const updatedCart = updateCart(existingCart,product,qtyToBeAdded) ; 

            setAnimate(true)
            setTimeout(toggleAnimate,2100);

            setCart( updatedCart)

        }

        else console.log('there is not an item selected to apply a custom finish to')
        
        
        
        
    }
 

    const handleAddToCartClick = () => {

         
        
        // check if process is in broweser
        if (process.browser) {
            
            // check if item is in stock
            if(product.stockStatus === 'IN_STOCK'){                

                // if cart has item(s) already, then update the exisiting cart
                let existingCart = localStorage.getItem('cedarcreekforestry-cart');
                if (existingCart) {

                    existingCart = JSON.parse(existingCart);

                    console.log(existingCart)

                    // check if product is a finish type
                    // fuck this for right now and try to convince sterling 
                    // its too much a pain in the ass 

                    // if (product.productCategories.nodes[0].name === 'Finishes'){

                    //     handleFinishTypes()

                    // }


                    // check if product already in cart
                    if ( indexOfProductInCart(product) > -1) {

                        
                        
                        // check if amount requested is available 
                        if (existingCart.products[indexOfProductInCart(product)].qty === product.stockQuantity || product.stockQuantity === null){
                            
                            // if quantity of product in cart is equal to the stock quantity 
                            // or if stockQuantity is null (ie Sterling forgot to add quantity)
                            // then disallow adding it to cart
                             
                                   
                            return null 


                        }
                        else{

                            // otherwise quantity of product in cart is less then stock quantity
                            // allow adding it to cart
                            
                            const qtyToBeAdded = 1;
                    
                            const updatedCart = updateCart(existingCart,product,qtyToBeAdded) ;

                            indexOfProductInCart(product)
                            
                            
                            setAnimate(true)
                            setTimeout(toggleAnimate,2100);

                            setCart( updatedCart)
                    
                        }
                        
                    } 
                    else{

                        // cart exists and item in stock but item not yet in cart
                        // add item to cart
                            
                        const qtyToBeAdded = 1;
                        
                        const updatedCart = updateCart(existingCart,product,qtyToBeAdded) ; 
                        console.log("you just tried adding ",product)

                        setAnimate(true)
                        setTimeout(toggleAnimate,2100);

                        setCart( updatedCart)

                    }
                    
                } 

                // like i said before this is too much a pain in the ass

                // else if (product.productCategories.nodes[0].name === 'Finishes'){
                //     // this acutally shouldn't be allowed because the user needs to first 
                //     // select a slab from a series to apply the finish to
                //     handleFinishTypes()
                // }
                else{

                    // if no item in the cart, then create an empty array and add item. 
                     
                    const newCart = addFirstProduct(product);

                    setAnimate(true);
                    setTimeout(toggleAnimate,2100);
                    setCart( newCart);

                }                
        
            } 
            else{
                
                // if item not in stock disallow adding it to cart 
                // then toggle popover notifying user they have reached
                // they have reached the limit available to purchase
                
               
                 
                return null
                    
                
            }
            

        }
    }

    

    
    return(
        <React.Fragment>

             <div className = "row d-flex justify-content-center">
             <div role = 'button' id = 'add-to-cart' className = "text-center cart-action-btn add-to-cart-btn" onClick={ checkIfAvailable(product)[0] ?  handleAddToCartClick : e=>toggle(e) }> ADD TO CART</div>
             </div>
             <div className = "row d-flex justify-content-center">
            <ViewCartButton />
             </div>

             <Popover placement = "bottom" isOpen = {pop} trigger = 'click legacy' target = 'add-to-cart' toggle = {e=>toggle(e,'focus')}>
                 <PopoverBody>
                 <p> {message} </p>
                 </PopoverBody>
             </Popover>

             <CartSuccess  animate = {animate} cart = {cart} />
        
        </React.Fragment>
       
    )
}

export default AddToCartButton