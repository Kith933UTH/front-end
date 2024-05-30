import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../api';

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		isLoading: false,
		isError: false,
		filters: {
			price: [
				{
					value: 'Low to high',
					choose: true,
					callback: (a, b) => a - b,
				},
				{
					value: 'High to low',
					choose: false,
					callback: (a, b) => b - a,
				},
			],
			rate: [
				{ value: 1, choose: false },
				{ value: 2, choose: false },
				{ value: 3, choose: false },
				{ value: 4, choose: false },
				{ value: 5, choose: false },
			],
		},
		// searchKey: '',
		data: [],
	},
	reducers: {
		changeFilterPrice: (state, action) => {
			state.filters.price = state.filters.price.map((price) => {
				if (price.value === action.payload)
					return { ...price, choose: true };
				else {
					return { ...price, choose: false };
				}
			});
		},
		changeFilterRate: (state, action) => {
			state.filters.rate = state.filters.rate.map((rate) => {
				if (rate.value === action.payload)
					return { ...rate, choose: !rate.choose };
				else {
					return rate;
				}
			});
		},
		// changeSearchKey: (state, action) => {
		// 	state.searchKey = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
				state.isError = false;
			})
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProducts.rejected, (state) => {
				state.data = [];
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (type) => {
		const data = await getData('products/list/' + type);
		return data;
	}
);

export default productsSlice;
