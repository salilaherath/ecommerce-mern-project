import { configureStore } from '@reduxjs/toolkit';
import cartDataReducer from './features/cart/cartDataSlice';
import productListDataReducer from './features/products/productListDataSlice';
import productDataReducer from './features/products/productDataSlice';
import userLogInDataReducer from './features/users/userLogInDataSlice';
import profileDataReducer from './features/users/profileDataSlice';

export const store = configureStore({
	reducer: {
		productList: productListDataReducer,
		productDetails: productDataReducer,
		cart: cartDataReducer,
		userLogInDetails: userLogInDataReducer,
		profileDetails: profileDataReducer,
	},
});
