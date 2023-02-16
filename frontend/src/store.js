import { configureStore } from '@reduxjs/toolkit';
// import {
// 	productDetailsReducer,
// 	productListReducer,
// } from './reducers/productReducers';
//import { cartReducer } from './reducers/cartReducers';
import cartDataReducer from './features/cart/cartDataSlice';
import productListDataReducer from './features/products/productListDataSlice';
import productDataReducer from './features/products/productDataSlice';

export const store = configureStore({
	reducer: {
		//productList: productListReducer,
		productList: productListDataReducer,
		productDetails: productDataReducer,
		// cart: cartReducer,
		cart: cartDataReducer,
	},
});
