import React, { useState, useCallback, useEffect } from 'react'
import { useContext } from 'react';
import { AppContext } from "../context/AppContext";
import {injectStripe, CardNumberElement, CardExpiryElement, CardCvcElement} from 'react-stripe-elements';
import {Form, FormGroup, Input, Modal , ModalBody , ModalHeader ,
        ModalFooter , Button ,Label, CustomInput, Collapse , Table, Popover, PopoverBody,
        FormFeedback} from 'reactstrap';
import postOrder from '../../courier/postOrders' ; 
import {getToken_srcId,processOrder} from './processPayment'
import { processPaymentTest } from './processPaymentTest';
import {addFirstProduct, updateCart , removeItemFromCart } from './functions'
import cartIcon from '../../shared/icons/cart.png'
import '../../step_progress_theme.css';
import  '../../styles/paymentMethodSelection.scss'
import '../../buttons.scss'



const orderData = {
  payment_method: "stripe",
  payment_method_title: "Direct Bank Transfer",
  set_paid: false,
  billing: {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "US",
    email: "",
    phone: ""
  },
  shipping: {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "US"
  },
  line_items: [
    // {
    //   // product_id: 175,
    //   // quantity: 1
    // }
  ]
};

const ConfirmOrder = (props) =>{

let billing = props.billing ;

  // console.log(props)

  if (props.step2 ){

  return (
    <React.Fragment>
   
        <h3 style ={{
          display: "flex",
          justifyContent: "flex-end"
        }}>
          Review Order
        </h3>

      
    <Table striped>
      <tbody>
        <tr>
          <th scope="row">Recipient</th>
          <td>{`${billing.first_name}  `  }</td>
        </tr>
        <tr>
          <th scope="row">Adress</th>
          <td>{`${billing.address_1}  `  }</td>
        </tr>
        <tr>
          <th scope="row">City</th>
          <td>{`${billing.city}  `  }</td>
        </tr>
        <tr>
          <th scope="row">State</th>
          <td>{`${billing.state}  `  }</td>
        </tr>
        <tr>
          <th scope="row">Zip</th>
          <td>{`${billing.postcode}  `  }</td>
        </tr>
      </tbody>
    </Table>

      <div className = "row ">
        <div className = "col d-flex justify-content-start">
          <div className = 'brk-btn store-back-btn' onClick = {props.backStep}>
            BACK
          </div> 
        </div>
      </div>  
    </React.Fragment>
  );}
  else  return null
}

const PaymentFormHeader = (props) => {
   
  var stepTitleDisplay = props.step2 ? 'none' : ' flex'
  var choice_lineDisplay = props.step2 ? 'd-none' : '' ; 
  var paymentMethodDisplay  =  props.step2 ? 'd-none' : ' container payment_method_selection_container'
  return(

 <React.Fragment>
      <h3 
    style = {{
      display: stepTitleDisplay ,
      justifyContent:"center"
      }}>
        Payment
  </h3>
  <div className = {paymentMethodDisplay}>
    <div className = "row d-flex justify-content-between">
      <label className = 'col-6 text-center payment_method_choice' onClick={props.toggleChoice}>Credit Card</label>
      <label className = "col-6 text-center payment_method_choice" onClick={props.toggleChoice}>PayPal</label>
    </div>

  </div>
  <div className = {` container ${ choice_lineDisplay}`}>
    <div className = 'row'>
      <div className = {`choice_line ${props.paymentMethod } `} />
    </div>
  </div>
 </React.Fragment>
    
  )
}


const FirstStepOrSecondStep = (props) =>{

 
  // var stepTitleDisplay = props.step2 ? 'none' : ' flex'
  // var choice_lineDisplay = props.step2 ? 'd-none' : '' ; 
  // var paymentMethodDisplay  =  props.step2 ? 'd-none' : ' container payment_method_selection_container'
  
  if (false === props.step1){ 
    return( 
      <React.Fragment>
        <ShippingForm
          shipping = {props.shipping}
          billing= {props.billing}
          updateShippingAddress = {props.updateShippingAddress}
          updateBillingAdress= {props.updateBillingAdress} 
          nextStep = {props.nextStep}/>
      </React.Fragment> 
    );
  }
  else
    return(
      <React.Fragment>

        <PaymentFormHeader
        step2 = {props.step2}
        paymentMethod = {props.paymentMethod }
        toggleChoice = {props.toggleChoice}
        />
        {props.paymentMethod === 'isCard'?
           <PaymentForm 
           shipping = {props.shipping}
           billing = {props.billing}
           updateBillingAdress = {props.updateBillingAdress}
           step2 = {props.step2}
           getNameOnCard = {props.getNameOnCard }
           backStep = {props.backStep}
           nextStep = {props.nextStep}
           setBillingAdressToShippingAddress = {props.setBillingAdressToShippingAddress}
           />
           :
           <div>
             PayPal Coming Soon!
           </div>
        }
     
        
      </React.Fragment> 
  );
}

const ConfirmOrderModal = (props) =>{

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} >
        <ModalHeader toggle={props.toggle}>Confirm Order</ModalHeader>
        <ModalBody>
          {props.message}
        </ModalBody>
        <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>{' '} Ok {' '}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

class StepProgress extends React.Component{
constructor(props){
  super(props);
  this.state ={ 
    step1:false,
    step2:false,
    step3:false
    }
  }
  render(){
    return (
      <ul className="steps mt-2">
        <li className= {`step step--active ${this.props.step1?"step--complete":"step--incomplete "}`}>
          <span className="step__icon"> 1 </span>
          {/* <span class="step__label">Step 1</span> */}
        </li>
        <li className= {`step ${this.props.step2?  " step--complete ":" step--incomplete " }`
                      + `${this.props.step1? "step--active" : ''}` }>
          <span className="step__icon">2</span>
          {/* <span className="step__label">Step 2</span> */}
        </li>
        <li className= {`step  ${this.props.step3?" step--complete ":" step--incomplete "}`
                    + `${this.props.step2? " step--active " : ''}` }>
          <span className="step__icon">3</span>
          {/* <span className="step__label">Step 3</span> */}
        </li>
      </ul>

    );
  }  
}

class ShippingForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      emailState : '',
      phoneState : '',
      postcodeState: '',
      adress1State : '',
      cityState : '',
      stateState: '',
      first_nameState: '',
      last_nameState: '',
      formIsValid : false
    }
    
    this.validate = this.validate.bind(this);  
    this.validateForm = this.validateForm.bind(this);
  }

      
    handleInputChange = (e,form) => {
      
      const { name, value } = e.target;
        
         
      if (form === 'shipping'){

        this.props.updateShippingAddress( name , value)

      }
      else this.props.updateBillingAdress( name, value )

    }

    // validate input fields onBlur

    validate(e,input) {

      e.preventDefault()

      if (input === 'email'){

        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
        if (emailRex.test(e.target.value)) {
          this.setState( { emailState : 'has-success'} )
        } 
        else {
        this.setState( { emailState : 'has-danger'} )
        }
      }
      else if (input === 'phone'){

        const phoneRex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/ ; 
        
        if (phoneRex.test(e.target.value)){
          this.setState({phoneState : 'has-success'})
        }
        else{
          this.setState({phoneState:'has-danger'})
        }

      }
      else if (input === 'postcode'){

        const postcodeRex = /^[0-9]{5}(?:-[0-9]{4})?$/;

        if (postcodeRex.test(e.target.value)){
          this.setState({postcodeState: 'has-success'})
        }
        else{
          this.setState({postcodeState:'has-danger'})
        } 

      }
      else if (input === 'address_1'){

        const adress1RegEx = /^(?:[Pp][Oo]\s[Bb][Oo][Xx]|[0-9]+)\s(?:[0-9A-Za-z\.'#]|[^\S\r\n])+/ ;

        if (adress1RegEx.test(e.target.value)){
        this.setState({address_1State : 'has-success'})
        }
        else{
          this.setState({address_1State:'has-danger'})
        }

      }
      else if (input === 'city'){

        const cityRegEx =  /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/ ;

        if (cityRegEx.test(e.target.value)){
        this.setState({cityState : 'has-success'})
        }
        else{
          this.setState({cityState:'has-danger'})
        }

      }  
      else if (input === 'state'){

        const stateRegEx = /^[A-Za-z]+$/ ; 

        if (stateRegEx.test(e.target.value)){
        this.setState({stateState : 'has-success'})
        }
        else{
          this.setState({stateState:'has-danger'})
        }

      }
      else if (input === 'first_name'){

        const firstNameRegEx = /^[a-z ,.'-]+$/i;

        if (firstNameRegEx.test(e.target.value)){
          this.setState({first_nameState : 'has-success'})
        }
        else{
          this.setState({first_nameState:'has-danger'})
        }

      }
      else if (input === 'last_name'){
        
        const lastNameRegEx = /^[a-z ,.'-]+$/i;

        if (lastNameRegEx.test(e.target.value)){
        this.setState({last_nameState : 'has-success'})
        }
        else{
          this.setState({last_nameState:'has-danger'})
        }

      }

    }

// validate form when user clicks next button 

 validateForm = () =>{
  const billing = this.props.billing ; 

  const shipping = this.props.shipping ; 

  const firstNameRegEx = /^[a-z ,.'-]+$/i;

  const lastNameRegEx = /^[a-z ,.'-]+$/i ;

  const adress1RegEx = /^(?:[Pp][Oo]\s[Bb][Oo][Xx]|[0-9]+)\s(?:[0-9A-Za-z\.'#]|[^\S\r\n])+/ ; 

  const cityRegEx =  /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/ ;

  const stateRegEx = /^[A-Za-z]+$/ ; 

  const postCodeRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/ ; 

  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneRegEx = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/ ; 



  const regExTests = [firstNameRegEx , lastNameRegEx , adress1RegEx , cityRegEx , stateRegEx , postCodeRegEx , emailRegEx , phoneRegEx ]

  // const newOrderData = Object.values(billing)

 

  const shippingOrderData = Object.values(shipping); 

  const billingOrderData = [billing.email, billing.phone]



  // remove address line 2 and country from test
  // only supports shipments made in US atm

  shippingOrderData.splice(3,1)
  shippingOrderData.splice(6,1)
  shippingOrderData.push(...billingOrderData)

  const newOrderData = shippingOrderData

  console.log(newOrderData)

  
  // create an array of boolean values containing the results of each regex test

  let regExTestResults = []

  regExTests.map((regEx,index)=>{

    regExTestResults.push(regEx.test(newOrderData[index].replace(/['"]+/g, '')))

  })

  //  function that gets all indexes of matching values in an array
 const getAllIndexes = (array, val) => {
  var indexes = [], i;
  for(i = 0; i < array.length; i++)
      if (array[i] === val)
          indexes.push(i);
  return indexes;
}

//  retrieve all indexes where regex tests fail

let RegExTestResultIndexes = getAllIndexes(regExTestResults,false)

//  if the regex test results contain no false items
 if (RegExTestResultIndexes.length === 0 ){
   
  //  allow user to move to next step
 return  this.props.nextStep()
}
else{

  //  loop through all regex test results and set the apporpriate state 
  //  to notify user of errors

  for(var i = 0 ; i < RegExTestResultIndexes.length; i++){

    if (RegExTestResultIndexes[i] === 0){
      this.setState({first_nameState:'has-danger'})
      console.log('name test failed') 
    }
    else if (RegExTestResultIndexes[i] === 1){
      this.setState({last_nameState:'has-danger'})
      console.log('last name test failed')
    }
    else if (RegExTestResultIndexes[i] === 2){
      this.setState({address_1State:'has-danger'})
      console.log('adress line 1 test failed')
    }
    else if (RegExTestResultIndexes[i] === 3){
      this.setState({cityState:'has-danger'})
      console.log('city test failed')
    }
    else if (RegExTestResultIndexes[i] === 4){
      this.setState({stateState:'has-danger'})
      console.log('state test failed')
    }
    else if (RegExTestResultIndexes[i] === 5){
      this.setState({postcodeState:'has-danger'})
      console.log('postcode test failed')
    }
    else if (RegExTestResultIndexes[i] === 6){
      this.setState({emailState:'has-danger'})
      console.log('email test failed')
    }
    else if(RegExTestResultIndexes[i] === 7){
      this.setState({phoneState:'has-danger'})
      console.log('phone test failed')
    }
    
  }
  return false
}




 }



  
  render(){
    
    const billing = this.props.billing ; 

    const shipping = this.props.shipping ; 

    return(

      <React.Fragment>

        <h3>Shipping Address</h3>
        
        <Form>
          <FormGroup className = "billing-adress-form">
        
          <div className = "form-row ml-0 mr-0 ">

              <Input className = "col-6" type="name" name="first_name"  placeholder="First Name"
                value = {shipping.first_name}
                onChange = {e=>this.handleInputChange(e,'shipping')} 
                onBlur = {e=>this.validate(e,'first_name')}
                valid = {this.state.first_nameState === 'has-success'}
                invalid = {this.state.first_nameState === 'has-danger'}
              />
                {
                  this.state.first_nameState === 'has-danger'
                  ?
                  <FormFeedback>
                    Oops! Looks like there's a problem with your First Name. Please enter a valid first name.<b/>
                    For example: The Most Awesomest Guy in the World
                  </FormFeedback>
                  :
                  null
                }

              <Input  className = "col-6" type="name" name="last_name"  placeholder="Last Name"
                value = {shipping.last_name}
                onChange = {e=>this.handleInputChange(e,'shipping')} 
                onBlur = {e=>this.validate(e,'last_name')}
                valid = {this.state.last_nameState === 'has-success'}
                invalid = {this.state.last_nameState === 'has-danger'}
              />
                {
                  this.state.last_nameState === 'has-danger'
                  ?
                  <FormFeedback>
                    Oops! Looks like there's a problem with your Last Name. Please enter a valid last name.<b/>
                    For example: Dr. Martin Luther King Jr. Sir Bob Crudite
                  </FormFeedback>
                  :
                  null
                }

          </div>

          <Input type="text" name="address_1" placeholder="Adress Line 1"
            value = {shipping.address_1}
            onChange = {e=>this.handleInputChange(e,'shipping')} 
            onBlur = {e=>this.validate(e,'address_1')}
            valid = {this.state.address_1State === 'has-success'}
            invalid = {this.state.address_1State === 'has-danger'}
          />
             {
              this.state.address_1State === 'has-danger'
              ?
              <FormFeedback>
                Oops Looks like there's a problem with the Address you entered. Please enter a valid Address. <b/>
                For Example: 123 Fake ST
              </FormFeedback>
              :
              null
              }

          <Input type="text" name="address_2" placeholder="Adress Line 2" 
            value = {shipping.address_2}
            onChange = {e=>this.handleInputChange(e,'shipping')} 
          />

          <div className = "form-row mr-0 ml-0">
            
              <Input className = "col-10" type="text" name="city"  placeholder="City"
                value = {shipping.city} 
                onChange = {e=>this.handleInputChange(e,'shipping')} 
                onBlur = {e=>this.validate(e,'city')}
                valid = { this.state.cityState == 'has-success'}
                invalid = {this.state.cityState === 'has-danger'}
              />
                {
                  this.state.cityState === 'has-danger'
                  ?
                  <FormFeedback>
                    Oops Looks like there's a problem with the City you entered. Please enter a valid City. <b/>
                    For Example: San Francisco or Tacoma
                  </FormFeedback>
                  :
                  null
                }

              <Input className = " col-2 " type="text" name="state"  placeholder="State" 
                value = {shipping.state}
                onChange = {e=>this.handleInputChange(e,'shipping')}  
                onBlur = { e=>this.validate(e,'state')}
                valid = {this.state.stateState=== 'has-success'}
                invalid = {this.state.stateState === 'has-danger'}
              />   
                {
                  this.state.stateState === 'has-danger'
                  ?
                  <FormFeedback>
                    Oops Looks like there's a problem with the State you entered. Please enter a valid State. <b/>
                    For Example : WA or Washington
                  </FormFeedback>
                  :
                  null
                }

          </div>  

          <Input type="text" name="postcode" placeholder="ZIP Code" 
            value = {shipping.postcode}
            onChange = {e=>this.handleInputChange(e,'shipping')}  
            onBlur = {e=>this.validate(e,'postcode')}
            valid = {this.state.postcodeState === 'has-success'}
            invalid={ this.state.postcodeState === 'has-danger'}
          />
            {
              this.state.postcodeState === 'has-danger'
              ?
              <FormFeedback>
                Oops! Looks like there's a problem with your zip code. Please enter a valid zip code.<b/>
                For example: 12345 or 12345-6789
              </FormFeedback>
              :
              null
            }

                
          <Input type="email" name="email"  placeholder="Email" 
            value = {billing.email}
            onChange = {e=>this.handleInputChange(e,'billing')} 
            onBlur = {e => this.validate(e,'email')}
            valid = {this.state.emailState === 'has-success'}
            invalid={ this.state.emailState === 'has-danger'}
          />
            {
              this.state.emailState === 'has-danger'
              ?
              <FormFeedback>
                Oops! Looks like there's a problem with your email. Please enter a valid email.
              </FormFeedback>
              :
              null
            }

        
          <Input type="phone" name="phone" placeholder="Phone"
            value = {billing.phone}
            onChange = {e=>this.handleInputChange(e,'billing')}  
            onBlur = {e=>this.validate(e,'phone') }
            valid = {this.state.phoneState === 'has-success'}
            invalid = {this.state.phoneState === 'has-danger'}
          />
            {
              this.state.phoneState === 'has-danger'
              ?
              <FormFeedback>
                Oops! Looks like there's a problem with your phone number. Please enter a valid phone number.<br/>
                For example: 1234567890, 123 456 7890, 123-456-7890, or (123)-456-7890
              </FormFeedback>
              :
              null
            }

          </FormGroup>

        
       <div className = "row">
         <div className ="col d-flex justify-content-end">
           {/* if form is valid allow user to move to next step otherwise dissallow */}
         <div className = " brk-btn store-back-btn" onClick = {()=>this.validateForm()}>
            NEXT
        </div>
         </div>
       </div>
       
    </Form>

      </React.Fragment>
    
);

  }

}

class BillingAddressForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      emailState : '',
      phoneState : '',
      postcodeState: '',
      adress1State : '',
      cityState : '',
      stateState: '',
      first_nameState: '',
      last_nameState: '',
      formIsValid : false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validate = this.validate.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.props.updateBillingAddress( name, value )

  }

  componentDidMount(){ 
    this.props.setBillingAdressToShippingAddress('true');  
  }

  validate(e,input) {

    e.preventDefault()

    if (input === 'email'){

      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
      if (emailRex.test(e.target.value)) {
        this.setState( { emailState : 'has-success'} )
      } 
      else {
      this.setState( { emailState : 'has-danger'} )
      }
    }
    else if (input === 'phone'){

      const phoneRex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/ ; 
      
      if (phoneRex.test(e.target.value)){
        this.setState({phoneState : 'has-success'})
      }
      else{
        this.setState({phoneState:'has-danger'})
      }

    }
    else if (input === 'postcode'){

      const postcodeRex = /^[0-9]{5}(?:-[0-9]{4})?$/;

      if (postcodeRex.test(e.target.value)){
        this.setState({postcodeState: 'has-success'})
      }
      else{
        this.setState({postcodeState:'has-danger'})
      } 

    }
    else if (input === 'address_1'){

      const adress1RegEx = /^(?:[Pp][Oo]\s[Bb][Oo][Xx]|[0-9]+)\s(?:[0-9A-Za-z\.'#]|[^\S\r\n])+/ ;

      if (adress1RegEx.test(e.target.value)){
      this.setState({address_1State : 'has-success'})
      }
      else{
        this.setState({address_1State:'has-danger'})
      }

    }
    else if (input === 'city'){

      const cityRegEx =  /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/ ;

      if (cityRegEx.test(e.target.value)){
      this.setState({cityState : 'has-success'})
      }
      else{
        this.setState({cityState:'has-danger'})
      }

    }  
    else if (input === 'state'){

      const stateRegEx = /^[A-Za-z]+$/ ; 

      if (stateRegEx.test(e.target.value)){
      this.setState({stateState : 'has-success'})
      }
      else{
        this.setState({stateState:'has-danger'})
      }

    }
    else if (input === 'first_name'){

      const firstNameRegEx = /^[a-z ,.'-]+$/i;

      if (firstNameRegEx.test(e.target.value)){
        this.setState({first_nameState : 'has-success'})
      }
      else{
        this.setState({first_nameState:'has-danger'})
      }

    }
    else if (input === 'last_name'){
      
      const lastNameRegEx = /^[a-z ,.'-]+$/i;

      if (lastNameRegEx.test(e.target.value)){
      this.setState({last_nameState : 'has-success'})
      }
      else{
        this.setState({last_nameState:'has-danger'})
      }

    }

  }


  validateForm = () =>{

    const billing = this.props.billing ; 
    
    const firstNameRegEx = /^[a-z ,.'-]+$/i;
    
    const lastNameRegEx = /^[a-z ,.'-]+$/i ;
    
    const adress1RegEx = /^(?:[Pp][Oo]\s[Bb][Oo][Xx]|[0-9]+)\s(?:[0-9A-Za-z\.'#]|[^\S\r\n])+/ ; 
    
    const cityRegEx =  /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/ ;
    
    const stateRegEx = /^[A-Za-z]+$/ ; 
    
    const postCodeRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/ ; 
    
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const phoneRegEx = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/ ; 
    
    
    
    const regExTests = [firstNameRegEx , lastNameRegEx , adress1RegEx , cityRegEx , stateRegEx , postCodeRegEx , emailRegEx , phoneRegEx ]
    
    // const newOrderData = Object.values(billing)
    
    const billingOrderData = Object.values(billing)
    
    // remove address line 2 and country from test
    // only supports shipments made in US at the moment
    
    billingOrderData.splice(3,1);
    billingOrderData.splice(6,1);
    
    const newOrderData = billingOrderData;
    
    console.log(newOrderData);
    
    
    // create an array of boolean values containing the results of each regex test
    
    let regExTestResults = []
    
    regExTests.map((regEx,index)=>{
    
      regExTestResults.push(regEx.test(newOrderData[index].replace(/['"]+/g, '')))
    
    })
    
    //  function that gets all indexes of matching values in an array
    const getAllIndexes = (array, val) => {
    var indexes = [], i;
    for(i = 0; i < array.length; i++)
        if (array[i] === val)
            indexes.push(i);
    return indexes;
    }
    
    //  retrieve all indexes where regex tests fail
    
    let RegExTestResultIndexes = getAllIndexes(regExTestResults,false)
    
    //  if the regex test results contain no false items
    if (RegExTestResultIndexes.length === 0 ){
    console.log('no erroes')
    //  allow user to move to next step
    return  this.props.nextStep()
    }
    else{
    
    //  loop through all regex test results and set the apporpriate state 
    //  to notify user of errors
    
    for(var i = 0 ; i < RegExTestResultIndexes.length; i++){
    
      if (RegExTestResultIndexes[i] === 0){
        this.setState({first_nameState:'has-danger'})
        console.log('name test failed') 
      }
      else if (RegExTestResultIndexes[i] === 1){
        this.setState({last_nameState:'has-danger'})
        console.log('last name test failed')
      }
      else if (RegExTestResultIndexes[i] === 2){
        this.setState({address_1State:'has-danger'})
        console.log('adress line 1 test failed')
      }
      else if (RegExTestResultIndexes[i] === 3){
        this.setState({cityState:'has-danger'})
        console.log('city test failed')
      }
      else if (RegExTestResultIndexes[i] === 4){
        this.setState({stateState:'has-danger'})
        console.log('state test failed')
      }
      else if (RegExTestResultIndexes[i] === 5){
        this.setState({postcodeState:'has-danger'})
        console.log('postcode test failed')
      }
      else if (RegExTestResultIndexes[i] === 6){
        this.setState({emailState:'has-danger'})
        console.log('email test failed')
      }
      else if(RegExTestResultIndexes[i] === 7){
        this.setState({phoneState:'has-danger'})
        console.log('phone test failed')
      }
      
    }
    return false
    }
    }


  render(){

    const billing = this.props.billing

    return(
      <React.Fragment>
          
        
        <Form>
          <FormGroup className = "billing-adress-form">
        
          <div className = "form-row ml-0 mr-0 ">

              <Input className = "col-6" type="name" name="first_name"  placeholder="First Name"
                value = {billing.first_name}
                onChange = {this.handleInputChange} 
                onBlur = {e=>this.validate(e,'first_name')}
                valid = {this.state.first_nameState === 'has-success'}
                invalid = {this.state.first_nameState === 'has-danger'}
              />
                {
                  this.state.first_nameState === 'has-danger'
                  ?
                  <FormFeedback>
                    Oops! Looks like there's a problem with your First Name. Please enter a valid first name.<b/>
                    For example: The Most Awesomest Guy in the World
                  </FormFeedback>
                  :
                  null
                }

              <Input  className = "col-6" type="name" name="last_name"  placeholder="Last Name"
                value = {billing.last_name}
                onChange = {this.handleInputChange}
                onBlur = {e=>this.validate(e,'last_name')}
                valid = {this.state.last_nameState === 'has-success'}
                invalid = {this.state.last_nameState === 'has-danger'}
              />
                {
                  this.state.last_nameState === 'has-danger'
                  ?
                  <FormFeedback>
                    Oops! Looks like there's a problem with your Last Name. Please enter a valid last name.<b/>
                    For example: Dr. Martin Luther King Jr. Sir Bob Crudite
                  </FormFeedback>
                  :
                  null
                }

          </div>

          <Input type="text" name="address_1" placeholder="Adress Line 1"
            value = {billing.address_1}
            onChange = {this.handleInputChange}
            onBlur = {e=>this.validate(e,'address_1')}
            valid = {this.state.address_1State === 'has-success'}
            invalid = {this.state.address_1State === 'has-danger'}
          />
             {
              this.state.address_1State === 'has-danger'
              ?
              <FormFeedback>
                Oops Looks like there's a problem with the Address you entered. Please enter a valid Address. <b/>
                For Example: 123 Fake ST
              </FormFeedback>
              :
              null
              }

          <Input type="text" name="address_2" placeholder="Adress Line 2" 
            value = {billing.address_2}
            onChange = {this.handleInputChange} 
          />

          <div className = "form-row mr-0 ml-0">
            
              <Input className = "col-10" type="text" name="city"  placeholder="City"
                value = {billing.city} 
                onChange = {this.handleInputChange} 
                onBlur = {e=>this.validate(e,'city')}
                valid = { this.state.cityState == 'has-success'}
                invalid = {this.state.cityState === 'has-danger'}
              />
                {
                  this.state.cityState === 'has-danger'
                  ?
                  <FormFeedback>
                    Oops Looks like there's a problem with the City you entered. Please enter a valid City. <b/>
                    For Example: San Francisco or Tacoma
                  </FormFeedback>
                  :
                  null
                }

              <Input className = " col-2 " type="text" name="state"  placeholder="State" 
                value = {billing.state}
                onChange = {this.handleInputChange} 
                onBlur = { e=>this.validate(e,'state')}
                valid = {this.state.stateState=== 'has-success'}
                invalid = {this.state.stateState === 'has-danger'}
              />   
                {
                  this.state.stateState === 'has-danger'
                  ?
                  <FormFeedback>
                    Oops Looks like there's a problem with the State you entered. Please enter a valid State. <b/>
                    For Example : WA or Washington
                  </FormFeedback>
                  :
                  null
                }

          </div>  

          <Input type="text" name="postcode" placeholder="ZIP Code" 
            value = {billing.postcode}
            onChange = {this.handleInputChange} 
            onBlur = {e=>this.validate(e,'postcode')}
            valid = {this.state.postcodeState === 'has-success'}
            invalid={ this.state.postcodeState === 'has-danger'}
          />
            {
              this.state.postcodeState === 'has-danger'
              ?
              <FormFeedback>
                Oops! Looks like there's a problem with your zip code. Please enter a valid zip code.<b/>
                For example: 12345 or 12345-6789
              </FormFeedback>
              :
              null
            }

                
          <Input type="email" name="email"  placeholder="Email" 
            value = {billing.email}
            onChange = {this.handleInputChange} 
            onBlur = {e => this.validate(e,'email')}
            valid = {this.state.emailState === 'has-success'}
            invalid={ this.state.emailState === 'has-danger'}
          />
            {
              this.state.emailState === 'has-danger'
              ?
              <FormFeedback>
                Oops! Looks like there's a problem with your email. Please enter a valid email.
              </FormFeedback>
              :
              null
            }

        
          <Input type="phone" name="phone" placeholder="Phone"
            value = {billing.phone}
            onChange = {this.handleInputChange} 
            onBlur = {e=>this.validate(e,'phone') }
            valid = {this.state.phoneState === 'has-success'}
            invalid = {this.state.phoneState === 'has-danger'}
          />
            {
              this.state.phoneState === 'has-danger'
              ?
              <FormFeedback>
                Oops! Looks like there's a problem with your phone number. Please enter a valid phone number.<br/>
                For example: 1234567890, 123 456 7890, 123-456-7890, or (123)-456-7890
              </FormFeedback>
              :
              null
            }

          </FormGroup>
       
    </Form>

    <div className = "row">
        <div className = "col d-flex justify-content-start">
          <div className = 'brk-btn store-back-btn' onClick = {this.props.backStep}>
            BACK
          </div> 
        </div>
      <div className = "col d-flex justify-content-end">
    
          <div className = 'brk-btn store-back-btn' onClick = {this.validateForm} type = "submit"> 
            NEXT
          </div>                             
      </div>
    </div>  

     

      </React.Fragment>
    )
  }

}


const PaymentForm = (props) =>{
  
  const [ cart ] = useContext( AppContext );
  const totalPrice = ( null !== cart && Object.keys( cart ).length ) ? cart.totalProductsPrice : '';
      
  const handleInputChange = (e) => {
   
    const { name, value } = e.target;

    props.getNameOnCard(  name, value )
    props.getNameOnCard("amount" , totalPrice)    

  }

  const [collapse, setCollapse] = useState(false);

  const handleBillingInfo = (param) => {

    if (param === 'true'){

      props.setBillingAdressToShippingAddress('true')
      setCollapse(false)

    }
    else{

      props.setBillingAdressToShippingAddress('false')
      setCollapse(true)

    }

  }
 

    const createOptions = () => {
      return {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            fontFamily: 'Open Sans, sans-serif',
            letterSpacing: '0.025em',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#c23d4b',
          },
        }
      }
    };
    
    const display = props.step2 ? 'none' : ' block'
 
    return (
    
      
      <div style = {{
        display:display
      }}>
          <input
            className = "form-control mb-2"
            type="text"
            name="name_onCard"
            placeholder="Name"
            onChange={e=>handleInputChange(e)}
            />

          <CardNumberElement 
            {...createOptions()}
            className= "form-control mb-2"/>

          <div className = "form-row ml-0 mr-0 ">

          <CardExpiryElement className = "col-6 form-control mb-2"/>

          <CardCvcElement className = "col-6 form-control mb-2"/>
          </div>

          <FormGroup>
          
            <div className = "form-row d-flex justify-content-between mr-1 ml-1" >

              <FormGroup>
            
              <h3>Billing Address</h3>
              
              </FormGroup>

              <FormGroup check>

                  <CustomInput type="radio" id="exampleCustomRadio" name="customRadio"  defaultChecked  label="Same as Shipping" onClick = {()=>handleBillingInfo('true')}/>
                
                  <CustomInput type="radio" id="different-billing-address" name="customRadio" label="Different Address" onClick = {()=>handleBillingInfo('false')}/>          
              
              </FormGroup> 

            </div>

        </FormGroup>

          <Collapse isOpen = {collapse}>
              <BillingAddressForm 
                setBillingAdressToShippingAddress = {props.setBillingAdressToShippingAddress}
                updateBillingAddress = {props.updateBillingAdress}
                billing = {props.billing}
                shipping = {props.shipping}
                billingAddressSameAsShipping = {!collapse}
                nextStep = {props.nextStep}
                backStep = {props.backStep}
                />
          </Collapse>

       
       {  collapse
         ?
         null
         :
         <React.Fragment>
            <div className = "row">

                <div className = "col d-flex justify-content-start">
                  
                  <div className = 'brk-btn store-back-btn' onClick = {props.backStep}>
                    BACK
                  </div> 
                </div>

                <div className = "col d-flex justify-content-end">

                    <div className = 'brk-btn store-back-btn' onClick = {props.nextStep}> 
                      NEXT
                    </div>                             
                </div>

            </div> 
         </React.Fragment>
       }

      </div>
    );
  
}


const CartInfo = (props) => {



  // const {orientation}  = props ; 
  
  const [ cart, setCart ] = useContext( AppContext );
  
  const productsCount = ( null !== cart && Object.keys( cart ).length ) ? cart.totalProductsCount : '';
  
  const handleAddToCartClick = (e,product) => {
    e.preventDefault()
    
      if (process.browser) {

          let existingCart = localStorage.getItem('cedarcreekforestry-cart');

          // if cart has item(s) already, then update the exisiting cart
          if (existingCart) {

              existingCart = JSON.parse(existingCart);
              
              const qtyToBeAdded = 1;
              
              const updatedCart = updateCart( existingCart,product,qtyToBeAdded) ;
              
              setCart( updatedCart)

              props.updateOrder() 

          } else{

              //  I dont think this else statement in neccessary becuase 
              // cart will always exist by the time this function is available

              // if no item in the cart, then create an empty array and add item.
              
              const newCart = addFirstProduct(product);

              setCart( newCart)

              // update order data when user adds item to cart 

              props.updateOrder() 
          }
      }
    }

    const handleRemoveProductClick = (e,product) =>{

       e.preventDefault()
      
      if (process.browser){

        let updatedCart = removeItemFromCart(e,product)
              
              setCart( updatedCart)

              // update order data line items when 
              // user removes item from cart

              props.updateOrder()

        
        
      }
    }
 
  // this section runs everytime when component updates 
  //  if the cart exisits 
  if (null !== cart && Object.keys(cart).length ){

    let newLine_items = [] ; 

    // create line items in to add to Order Data from cart 
    for (var i = 0 ; i < Object.keys(cart.products).length ; i++ ){

      newLine_items.push( {"product_id" : cart.products[i].productId, "quantity": cart.products[i].qty })  
      
    } 

    // if the products in the orderData does not reflect 
    // what is currrently in the users cart then update the order. 

    if(props.line_items.length !== newLine_items.length){
   
      props.updateOrder()
       
    } 
 
  } 

	return (
		<React.Fragment>

        <div  onClick = {props.collapse} className={props.isOpen?"circle-plus closed opened":"circle-plus closed " }
          style = {{
            position: 'absolute',
            top:'-6px',
            right: '15px'
          }}>
            <div className="circle">
                <div className="horizontal"></div>
                <div className="vertical"></div>
            </div>
        </div>
        <Collapse isOpen = {props.isOpen}>

          
        {productsCount?   
                cart.products.map( (item,index) => {
                    return(
                    
                        <div key ={index} className = "row mr-0 ml-0 cart-inventory-container"
                          style = {{padding: "0px 0px"}}>
                            <div className = "col-5">
                            <img src = {item.image.sourceUrl} width = "100%"/>
                            <div className = "cart-controls row d-flex justify-content-between align-items-center">                             
                              
                              <Button role = 'button' className = "col-4 "  
                                   onClick = { 
                                              // if popover is open 
                                              props.pop[index]                                              
                                              ? 
                                              // then close popover and remove item
                                              e=>{props.setPop(e,index,'focus') ;  handleRemoveProductClick(e,item.productId) }                                              
                                              :
                                              // otherwise just remove item
                                              e => handleRemoveProductClick(e,item.productId)
                                              }>                                                
                              <div className = 'minus-btn'/> 
                              </Button>

                              <div  id = {`k${index}`} tabIndex="0" className = "col-4 text-center align-content-center p-0">

                               <span className = "">{ item.qty }</span> 

                              </div>
                              
                              <Button   role = 'button'  className = {`${item.stockQuantity === item.qty ? 'add-to-cart-not-allowed' : ''}  col-4 d-flex justify-content-end`}
                              // if the qty of the product in the cart is equal to the max quantity in stock or if the amount is null (sterling forgot to set qty)
                              // dissalow adding it to cart and toggle a popover message
                              // onClick = {item.stockQuantity === item.qty || item.stockQuantity === null  ? e => props.setPop(e,index) :  (e) =>handleAddToCartClick(e,item)}   
                                onClick = {item.stockQuantity === item.qty   ? e => props.setPop(e,index) :  (e) =>handleAddToCartClick(e,item)}   
                                >
                              <div className = "plus-btn"/>                                 
                              </Button>                            
                           
                            </div>

                            <Popover  placement= "top" isOpen = {props.pop[index]} trigger = 'legacy click' toggle = {e=>props.setPop(e,index,'focus')} target = {`k${index}`}>
                              <PopoverBody>
                                <p>
                                  this is the maximum amount available
                                </p>
                              </PopoverBody>
                            </Popover>                                       

                            
                            </div>
                            <div className = "col-5">
                                <p>
                                    {item.name}
                                </p>
                            </div>
                            <div className = "col-2"
                              style = {{padding: "0px 0px"}}>
                                ${item.price}
                            </div>
                        </div>
                        
                    );
                  
                })
                
            :
            <div></div>
        }
        </Collapse>
          
          
           
		</React.Fragment>

	)
};


const TotalPrice = (props)=>{

    const [ cart ] = useContext( AppContext );
    const totalPrice = ( null !== cart && Object.keys( cart ).length ) ? cart.totalProductsPrice : '';
        
        
     return(
        <React.Fragment>
            {totalPrice?
                   
            <div  className = "row justify-content-end mr-0 ml-0 pr-3 cart-inventory-container">

            <img src = {cartIcon} width = "25px"
            style = {{ 
              position: 'absolute',
              left: '25px'
              }}
            
            ></img>   
                Total ${totalPrice}
            </div>

            :
            null
         }
        </React.Fragment>
     );
      
    
};

class CheckOutPage extends React.Component{
    constructor(props){
        super(props)
            this.state={
                orientation: '',
                name_onCard: '',
                orderData: orderData,
                modal:false,
                collapse: false , 
                step1: false,
                step2: false,
                step3: false,
                paymentMethod: 'isCard',
                paymentProcessing:true,
                paymentMessage:'',
                pop:[]
                                    
            }
            this.backStep = this.backStep.bind(this);
            this.handleOrientation = this.handleOrientation.bind(this);
            this.nextStep = this.nextStep.bind(this);
            this.getNameOnCard = this.getNameOnCard.bind(this);
            this.updateShippingAddress = this.updateShippingAddress.bind(this);
            this.updateBillingAdress = this.updateBillingAdress.bind(this);
            this.setBillingAdressToShippingAddress = this.setBillingAdressToShippingAddress.bind(this);
            this.updateOrder = this.updateOrder.bind(this);
            this.toggle = this.toggle.bind(this);
            this.collapse = this.collapse.bind(this);
            this.toggleChoice = this.toggleChoice.bind(this);
            this.handlePop = this.handlePop.bind(this);
            this.setPop = this.setPop.bind(this);
    
        }

        // switches payment method to either Card or PayPal

        toggleChoice = (e) => {
          let paymentMethod = String(e.target.innerHTML ) 
    
          switch (paymentMethod){
              case 'Credit Card' :
              
                this.setState({paymentMethod:'isCard'});
                break
              case 'PayPal' :
               
                this.setState({paymentMethod:'isPaypal'});
                break

          }
                 
        }

        // open and closes confirm order Modal

        toggle(){
          this.setState({modal:!this.state.modal})
          
        }

        // opens or collapses order summary 

        collapse(){
          this.setState({
            collapse:!this.state.collapse
          })
        }

        // when user clicks purchase button

        handleSubmit = async(e) =>{
          e.preventDefault();
          this.setState({step3:true})

          try {
            // create stripe payment token
            let {token} = await this.props.stripe.createToken({ name: this.state.name_onCard});
            console.log(token)

            if (token !== undefined ){
              
            // create stripe payment source and retrive source id
            let token_src = await getToken_srcId(token.id)
            console.log(token_src.id)

            // create new order in woocommerse
            let order =  await postOrder(this.state.orderData);
            let order_id = order.id
            console.log(order)
            console.log(order_id)
             
            // send token and orderId to cedarcreek server and process payment
            // processOrder(token_src.id,order_id)
            // .then(res=>{
            //   console.log(res)
            //   this.setState({paymentMessage:res})
            //   this.setState({paymentProcessing:false});
            //   this.setState({modal:true})
            // }); 

            processPaymentTest(token_src.id,order_id)
            .then(res=>{
              console.log(res)
              
              this.setState({modal:true})
              this.setState({paymentMessage:res.message})
              this.setState({paymentProcessing:false});
              
            }); 
            
            }else{
              this.setState({ paymentMessage:'looks like there was a problem with the card information you entered. Please insure the card information is correct'});
              this.setState({modal:true});
            }
          } catch (e) {

            console.log(e)
            throw e ; 
          }
          
        }  
        
        
        updateOrder(){

          // console.log('state of order data before updateOrder invoked', this.state.orderData) 

          let newLine_items = [] ; 

          let existingCart = localStorage.getItem('cedarcreekforestry-cart');
           

          if (existingCart){
             
            existingCart = JSON.parse(existingCart);

            // cart exists update order to reflect products in cart

            for (var i = 0 ; i < Object.keys(existingCart.products).length ; i++ ){ 
                  newLine_items.push( {"product_id" : existingCart.products[i].productId, "quantity": existingCart.products[i].qty })  
                } 

                var newOrderData = {...this.state.orderData}
                newOrderData.line_items = newLine_items
                this.setState({orderData:newOrderData})

          }
          else {

            // cart does not exist remove line ittems from order data

            var newOrderData = {...this.state.orderData}
            newOrderData.line_items = [] ; 
            this.setState({orderData:newOrderData}) 

          } 

        }

        updateShippingAddress(key,value){
          let newOrderData = Object.assign({},orderData)
          newOrderData.shipping[key] = value

          this.setState({
            orderData:newOrderData
          })
        } 

        updateBillingAdress(key,value){

          let newOrderData = Object.assign({},orderData)
         newOrderData.billing[key]=value
         
          this.setState({
          
            orderData : newOrderData

          })
        }

        setBillingAdressToShippingAddress(param){

          let blankBillingData = Object.assign({},orderData.billing)
 
          
          if (param === 'true'){

            let billingData  = Object.assign({},this.state.orderData.billing) ; 
            let shippingData= Object.assign({},this.state.orderData.shipping)
            
            const newBillingData = Object.assign(billingData,shippingData) ; 

            const newOrderData = Object.assign({}, orderData)

            newOrderData['billing'] = newBillingData
  
      
            console.log('setted billing same as shipping','og order Data: ', orderData)
            console.log('new OrderData: ', newOrderData)

            this.setState({orderData:newOrderData})
 
          }

          else{

            const newBillingData = blankBillingData

            const newOrderData = Object.assign({}, orderData)

            newOrderData['billing'] = newBillingData

            console.log('new OrderData: ', newOrderData)

            this.setState({orderData:newOrderData})

             

          }


        }

        getNameOnCard(name,value){

             this.setState( { [name] : value} )
  
        }
        handleOrientation(){
            if (window.innerWidth >= window.innerHeight) {
                this.setState({orientation:"landscape"})  
            }
             else  {
                 this.setState({orientation:"portrait"})
            }
        }
       

        nextStep(){
          this.state.step1==false
          ?
          this.setState({step1: true})
          :
          this.setState({step2: true})
        }

        backStep(){
          this.state.step1 && this.state.step2
          ?
          this.setState({step2:false})
          :
          this.setState({step1:false})
        }

        componentWillMount(){
            this.handleOrientation()
        }
     

        handlePop(){
          const pop = []; 
          
             let existingCart = localStorage.getItem('cedarcreekforestry-cart');

               
              if (existingCart) {
                existingCart = JSON.parse(existingCart)
                
                for ( var i = 0; i < existingCart.products.length ; i++ ){
                   pop.push(false);
                                                         
                }

                 this.setState({pop:pop})

            }       
            else   this.setState({pop:[false]}) ;  
             
        }

        setPop(e,index,toggleOnBlur){
          e.preventDefault()
          const pop = [];  

          this.setState({pop:[]})

          let existingCart = localStorage.getItem('cedarcreekforestry-cart');
 

          if (existingCart) {
             existingCart = JSON.parse(existingCart)
            
            for ( var i = 0; i < existingCart.products.length ; i++ ){
               pop.push(false);                          
            }

            this.setState({pop:pop})

            

            //  if (arguments[2]){
            
            if (toggleOnBlur){

              this.handlePop()
              let newPop = this.state.pop;
              newPop.splice(index,1,false)
               console.log('third parameter present')
                
               

               this.setState({pop:newPop})
             }else {
               
              
              let newPop = this.state.pop;
              newPop.splice(index,1,!this.state.pop[index])
              console.log('third parameter not present',newPop)
              this.setState({pop:newPop})
             }

        }       
        else   this.setState({pop:[false]}) ;   
        }

        componentDidMount(){ 
            window.addEventListener("resize",this.handleOrientation)

            this.handlePop() 

        }
        
 
    
    render(){
     
      var orientation = this.state.orientation; 
      var grid = this.state.orientation === "landscape" ? " col-6 ": " col-12 " ; 
      var columnOrder = orientation === "landscape" ? "d-flex" : "flex-column-reverse" ; 
      var isClickable = this.state.step2 ? 'ready_state':'void_state' ; 
      const billing = this.state.orderData.billing ; 
      const shipping = this.state.orderData.shipping



        return(

        <React.Fragment>

	
                
                    <div className = {`row ${ columnOrder } justify-content-center`}>
                    
                    <div className = {`${grid}`}>

                      <StepProgress 
                      step1 = {this.state.step1}
                      step2 = {this.state.step2}
                      step3 = {this.state.step3}
                      />  

                     
                      <FirstStepOrSecondStep
                        shipping = {shipping}
                        billing = {billing}
                        nextStep = {this.nextStep}
                        backStep = {this.backStep}
                        getNameOnCard = {this.getNameOnCard}
                        step1 = {this.state.step1}
                        step2 = {this.state.step2}
                        updateShippingAddress = {this.updateShippingAddress}
                        updateBillingAdress = {this.updateBillingAdress}
                        paymentMethod = {this.state.paymentMethod}
                        toggleChoice = {this.toggleChoice}
                        setBillingAdressToShippingAddress = {this.setBillingAdressToShippingAddress}
                      />
                  
                      <ConfirmOrder
                        step2 = {this.state.step2}
                        billing = {billing}
                        backStep = {this.backStep}
                        />
                 

              <ConfirmOrderModal 
                message = {this.state.paymentMessage}
                modal = {this.state.modal}
                toggle = {this.toggle}
                />
                    </div>  

                        <div className = {`${grid} mt-3`}>
                            
                            <h3> Order Summary</h3>
                            <CartInfo  
                             line_items = {this.state.orderData.line_items}
                             pop = {this.state.pop}
                             setPop = {this.setPop}
                             orientation = {this.state.orientation}
                             updateOrder = {this.updateOrder}
                             isOpen = {this.state.collapse}
                             collapse = {this.collapse} 
                             />
                            <TotalPrice/>
                            <div className = "row d-flex justify-content-center">
                              <div className = { `text-center cart-action-btn add-to-cart-btn purchase-btn ${isClickable}`} onClick={this.state.step2?this.handleSubmit: null}>
                                PURCHASE
                              </div>
                            </div>
                           
                        </div>

                    </div>
                
               

        
        </React.Fragment>
        );
    }
    }

export default injectStripe(CheckOutPage);