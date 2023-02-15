import { configureStore } from '@reduxjs/toolkit';
import {
	productDetailsReducer,
	productListReducer,
} from './reducers/productReducers';

export const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productDetailsReducer,
	},
});
