

export const processPaymentTest = async (token,order_id) => {

    
        


            var url = 'https://4michael1angelo5.wpcomstaging.com/wp-json/wc/v2/stripe-payment';
                
            var myHeader = new Headers(); 

            myHeader.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams(); 
            urlencoded.append("order_id",order_id);
            urlencoded.append("payment_token",token);
            urlencoded.append("payment_method","stripe")

            var requestOptions = {
                method: 'POST',
                headers: myHeader,
                body: urlencoded,
            };

            const response  =   await fetch(url,requestOptions);

            const fetchedData =  await response.json(); 

            console.log(fetchedData)

           


            return new Promise ( ( resolve,reject ) => {

                resolve(fetchedData)

                reject(response.message)


     });

      


    }

    // Above code works for some reason and does not return cors errors. 


    // Below code was written 4 years ago in 2020 and worked then but does not now 2024.
    // keeps returing No "access control allow origin error when I try to post to server"
    // need to figure out why




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

         

