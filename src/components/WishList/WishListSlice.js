import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteData, getData, postData } from '../../api';

const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState: { isLoading: true, isError: false, data: [] },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWishList.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchWishList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchWishList.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(addToWishList.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(addToWishList.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(removeFromWishList.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(removeFromWishList.rejected, (state) => {
				state.data = [];
				state.isLoading = false;
			});
	},
});

export const fetchWishList = createAsyncThunk(
	'wishlist/fetchWishList',
	async (user) => {
		const data = await getData('/favoriteProducts', {
			headers: { Authorization: 'Bearer ' + user.token },
		});
		return data;
	}
);

export const addToWishList = createAsyncThunk(
	'wishlist/addToWishList',
	async (user) => {
		await postData(
			'/favoriteProducts',
			{ productId: user.productId },
			{
				headers: { Authorization: 'Bearer ' + user.token },
			}
		);
		const data = await getData('/favoriteProducts', {
			headers: { Authorization: 'Bearer ' + user.token },
		});
		return data;
	}
);

export const removeFromWishList = createAsyncThunk(
	'wishlist/removeFromWishList',
	async (data) => {
		await deleteData('/favoriteProducts/' + data.idRemove, {
			headers: { Authorization: 'Bearer ' + data.token },
		});
		const newData = await getData('/favoriteProducts', {
			headers: { Authorization: 'Bearer ' + data.token },
		});
		return newData;
	}
);

export default wishlistSlice;
