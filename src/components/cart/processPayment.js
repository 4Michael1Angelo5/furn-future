 
 
//  takes token id as a parameter
//  gets token source id from stripe server

  export const  getToken_srcId = async (token_id)  => {

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
	
	var urlencoded = new URLSearchParams();
	urlencoded.append("type", "card");
	urlencoded.append("token", token_id);
	urlencoded.append("key", "pk_test_7LEEquBX9joVxcuVTXsZW0RN002UkUsXj3");
	
	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: urlencoded,
	  redirect: 'follow'
	};
	
	const fetchedData = fetch("https://api.stripe.com/v1/sources", requestOptions)

	.then(response => { return  response.json()})
	.then(result => {
		console.log(result) 		
		return result
	
	})
	
	.catch(error => {return  error });	 

	return await fetchedData
}


export const processOrder = async (token,order_id) => {

	return new Promise( (resolve,reject)=>{
	   var url = 'https://4michael1angelo5.wpcomstaging.com/?wp-json/wc/v2/stripe-payment';
   
	   var formData = new FormData();	
   
	   formData.append("order_id", order_id);
	   formData.append("payment_token", token);
	   formData.append("payment_method", 'stripe');
   
	   var request = new XMLHttpRequest();
	   request.open("POST", url);
	   request.send(formData);
   
	   request.onload = (e) => {
		   if (request.readyState === 4) {
			 if (request.status === 200) {
   
			   let success = JSON.parse(request.responseText)
					
				   resolve(success.message)
					
			 } else {
					
				   console.log(order_id);				
				   console.log("Error", request)
				   alert( request.responseText );
				   reject( ()=> { return request.responseText})
				   // return request.responseText ; 
			 }
		   }
	   };
   } )
   }

 


 


 



  