/**
 * Extracts and returns float value from a string.
 *
 * @param {string} string String
 * @return {any}
 */
export const getFloatVal = ( string ) => {

	// let floatValue = string.match( /[+-]?\d+(\.\d+)?/g )[0];
	let floatValue = string.match( /[+-]?\d+(\.\d+)?/g ).join('');
	
	return ( null !== floatValue ) ? parseFloat( parseFloat( floatValue ).toFixed( 2 ) ) : '';

};

/**
 * Add first product.
 *
 * @param {Object} product Product
 * @return {{totalProductsCount: number, totalProductsPrice: any, products: Array}}
 */
export const addFirstProduct = ( product ) => {

	let productPrice = getFloatVal( product.price );

	let stockQuantity = product.stockQuantity;

	let newCart = {
		products: [],
		totalProductsCount: 1,
		totalProductsPrice: productPrice,
		// test 
		// stockQuantity : product.stockQuantity 
		// end test
	};

	const newProduct = createNewProduct( product, productPrice, 1 , stockQuantity );
	newCart.products.push( newProduct );

	localStorage.setItem( 'cedarcreekforestry-cart', JSON.stringify( newCart ) );

	return newCart;
};

/**
 * Create a new product object.
 *
 * @param {Object} product Product
 * @param {Integer} productPrice Product Price
 * @param {Integer} qty Quantity
 * @param {Integer} stockQuantity available stock
 * @return {{image: *, productId: *, totalPrice: number, price: *, qty: *, name: *}}
 */
export const createNewProduct = ( product, productPrice, qty ,stockQuantity ) => {

	return  {
		productId: product.productId,
		image: product.image,
		name: product.name,
		price: productPrice,
		qty,
		totalPrice: parseFloat( ( productPrice * qty ).toFixed( 2 ) ),
		stockQuantity: stockQuantity
	};

};

/**
 * Updates the existing cart with new item.
 *
 * @param {Object} existingCart Existing Cart.
 * @param {Object} product Product.
 * @param {Integer} qtyToBeAdded Quantity.
 * @param {Integer} newQty New Qty to be updated.
 * @return {{totalProductsCount: *, totalProductsPrice: *, products: *}}
 */
export const updateCart = ( existingCart, product, qtyToBeAdded, newQty = false  ) => {

	let updatedProducts = getUpdatedProducts( existingCart.products , product, qtyToBeAdded, newQty );

	const addPrice = (total, item) => {
		total.totalPrice += item.totalPrice;
		total.qty += item.qty;

		return total;
	};

	// Loop through the updated product array and add the totalPrice of each item to get the totalPrice
	const total = updatedProducts.reduce( addPrice, { totalPrice: 0, qty: 0 } );

	const updatedCart = {
		products: updatedProducts,
		totalProductsCount: parseInt( total.qty ),
		totalProductsPrice: parseFloat( total.totalPrice )
	};

	localStorage.setItem( 'cedarcreekforestry-cart', JSON.stringify( updatedCart ) );

	return updatedCart;
};





/**
 * Get updated products array
 * Update the product if it exists else,
 * add the new product to existing cart,
 *
 * @param {Object} existingProductsInCart Existing product in cart
 * @param {Object} product Product
 * @param {Integer} qtyToBeAdded Quantity
 * @param {Integer} newQty New qty of the product (optional)
 * @return {*[]}
 */
export const getUpdatedProducts = ( existingProductsInCart, product, qtyToBeAdded, newQty = false ) => {

	// Check if the product already exits in the cart.
	const productExitsIndex = isProductInCart( existingProductsInCart, product.productId );

	// If product exits ( index of that product found in the array ), update the product quantity and totalPrice
	if ( -1 < productExitsIndex ) {
		let updatedProducts = existingProductsInCart;
		let updatedProduct = updatedProducts[ productExitsIndex ];

		// If have new qty of the product available, set that else add the qtyToBeAdded
		updatedProduct.qty = ( newQty ) ? parseInt( newQty ) : parseInt( updatedProduct.qty + qtyToBeAdded );
		updatedProduct.totalPrice = parseFloat( ( updatedProduct.price * updatedProduct.qty ).toFixed( 2 ) );

		return  updatedProducts;
	} else {

		// If product not found push the new product to the existing product array.
		let stockQuantity = product.stockQuantity
		let productPrice = getFloatVal( product.price );
		const newProduct = createNewProduct( product, productPrice, qtyToBeAdded , stockQuantity);
		existingProductsInCart.push( newProduct );

		return existingProductsInCart;
	}
};

/**
 * Returns index of the product if it exists.
 *
 * @param {Object} existingProductsInCart Existing Products.
 * @param {Integer} productId Product id.
 * @return {number | *} Index Returns -1 if product does not exist in the array, index number otherwise
 */
const isProductInCart = ( existingProductsInCart, productId ) => {

	const returnItemThatExits = ( item, index ) => {
		if ( productId === item.productId ) {
			return item;
		}
	};

	// This new array will only contain the product which is matched.
	const newArray = existingProductsInCart.filter( returnItemThatExits );

	return existingProductsInCart.indexOf( newArray[0] );
};

/**
 * Remove Item from the cart.
 *
 * @param {Integer} productId Product Id.
 * @return {any | string} Updated cart
 */
export const removeItemFromCart = (e,productId ) => {
	 e.preventDefault();

	let existingCart = localStorage.getItem( 'cedarcreekforestry-cart' );
	existingCart = JSON.parse( existingCart );


	// If there is only one item in the cart, delete the cart.
	// if ( 1 === existingCart.products.length ) {
	if ( 1 === existingCart.totalProductsCount ) {

		localStorage.removeItem( 'cedarcreekforestry-cart' );
		return null;

	}

	// Check if the product already exits in the cart.
	const productExitsIndex = isProductInCart( existingCart.products, productId );
	 

	// If product to be removed exists
	if ( -1 < productExitsIndex ) {

		const productTobeRemoved = existingCart.products[ productExitsIndex ];
		// const qtyToBeRemovedFromTotal = productTobeRemoved.qty;
		const qtyToBeRemovedFromTotal =  1;
		// const priceToBeDeductedFromTotal = productTobeRemoved.totalPrice;
		const priceToBeDeductedFromTotal = productTobeRemoved.price;

		// Remove that product from the array and update the total price and total quantity of the cart
		let updatedCart = existingCart;
		// updatedCart.products.splice( productExitsIndex, 1 );
		// console.log( existingCart.products[productExitsIndex].qty)

		// if there is only one product left of the specified item but there are
		//  still other products in the cart remove only the specified item from the cart

		if (existingCart.products[productExitsIndex].qty === 1){

		 	updatedCart.products.splice( productExitsIndex, 1 );
		}
		else { 
			updatedCart.products[productExitsIndex].qty = existingCart.products[productExitsIndex].qty -  1;
		}
		updatedCart.totalProductsCount = updatedCart.totalProductsCount - qtyToBeRemovedFromTotal;
		updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;
		localStorage.setItem( 'cedarcreekforestry-cart', JSON.stringify( updatedCart ) );
		return updatedCart;

	} else {
		return existingCart;
	}
};