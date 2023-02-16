import { configureStore } from '@reduxjs/toolkit';
import {
	productDetailsReducer,
	productListReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
//import { productListSlice } from './features/products/productListSlice';

export const store = configureStore({
	reducer: {
		productList: productListReducer,
		//productList: productListSlice,
		productDetails: productDetailsReducer,
		cart: cartReducer,
	},
});
