import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilteredProducts = createAsyncThunk(
	'products/productsByFilters',
	async ({ page, limit, main, sub, color }) => {
		const response = await axios.get(
			`/api/products/productsByFilters?page=${page}&limit=${limit}&main=${main}&sub=${sub}&color=${color}`
		);
		return response.data;
	}
);

const filteredProductsSlice = createSlice({
	name: 'fetchFilteredProducts',
	initialState: {
		products: [],
		currentPage: 1,
		totalPages: 1,
		status: 'idle',
		isLoading: false,
		error: null,
		filters: {
			main: [],
			sub: [],
			color: [],
		},
	},
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setMainFilters: (state, action) => {
			state.filters.main = action.payload;
		},
		setSubFilters: (state, action) => {
			state.filters.sub = action.payload;
		},
		setColorFilters: (state, action) => {
			state.filters.color = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilteredProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.products = action.payload.products;
				state.currentPage = action.payload.currentPage;
				state.totalPages = action.payload.totalPages;
			})
			.addCase(fetchFilteredProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const {
	setCurrentPage,
	setMainFilters,
	setSubFilters,
	setColorFilters,
} = filteredProductsSlice.actions;
export default filteredProductsSlice.reducer;
