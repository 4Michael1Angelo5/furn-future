

const WooCommerceAPI = require('woocommerce-api');
const wooConfig = require('./config/wooConfig')

 
  const WooCommerce= new WooCommerceAPI({
    url:  wooConfig.siteUrl,
    consumerKey: wooConfig.consumerKey,
    consumerSecret: wooConfig.consumerSecret,
    wpAPI: true,
    version: 'wc/v1'
  });    
  
   const getProducts = async ()=>  WooCommerce.getAsync("products")

      .then(response => {
         return  JSON.parse(response.body)
      })
      .catch((error) => {
        console.log(error.response.data)
      });  


export default getProducts;



 



 











