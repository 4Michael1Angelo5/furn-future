// import  stripe from '../components/cart/processPayment'
const WooCommerceAPI = require('woocommerce-api');
const wooConfig = require('./config/wooConfig')


 
  const WooCommerce= new WooCommerceAPI({
    url:  wooConfig.siteUrl,
    consumerKey: wooConfig.consumerKey,
    consumerSecret: wooConfig.consumerSecret,
    wpAPI: true,
    version: 'wc/v1'
  });  

//   takes JSON data containing billing adress, product(s), and order total as a parameter,
//   and creates new order in WooCommerse.

// const data = {
//   payment_method: "stripe",
//   payment_method_title: "Direct Bank Transfer",
//   set_paid: false,
//   billing: {
//     first_name: "Chris",
//     last_name: "Butthead",
//     address_1: "969 Market",
//     address_2: "",
//     city: "San Francisco",
//     state: "CA",
//     postcode: "94103",
//     country: "US",
//     email: "john.doe@example.com",
//     phone: "(555) 555-5555"
//   },
//   shipping: {
//     first_name: "John",
//     last_name: "Doe",
//     address_1: "969 Market",
//     address_2: "",
//     city: "San Francisco",
//     state: "CA",
//     postcode: "94103",
//     country: "US"
//   },
//   line_items: [
//     {
//       product_id: 175,
//       quantity: 1
//     }
//   ]
// };
  
  const postOrder = async(data) => WooCommerce.postAsync("orders", data)
  
  .then((response) => {
  
    return  JSON.parse( response.body);
   
  })
  .catch((error) => {
    console.log(error.response.data);
  });


export default postOrder;



 



 











