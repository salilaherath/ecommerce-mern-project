import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLatestProducts = createAsyncThunk(
	'latestProducts',
	async (category = '') => {
		const response = await axios.get(
			`/api/products/latest?category=${category}`
		);
		return response.data;
	}
);

const latestProductsSlice = createSlice({
	name: 'latestProducts',
	initialState: { products: [], status: 'idle', error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLatestProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchLatestProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.products = action.payload;
			})
			.addCase(fetchLatestProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default latestProductsSlice.reducer;
