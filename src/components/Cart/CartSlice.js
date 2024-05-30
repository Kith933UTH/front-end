import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteData, getData, postData, updateData } from '../../api';

const cartSlice = createSlice({
	name: 'cart',
	initialState: { isLoading: false, isError: false, data: [] },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCart.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(addToCart.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(removeFromCart.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(removeFromCart.rejected, (state) => {
				state.data = [];
				state.isLoading = false;
			})
			.addCase(increaseQuantity.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(increaseQuantity.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(decreaseQuantity.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(decreaseQuantity.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeEntireCart.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(removeEntireCart.rejected, (state) => {
				state.data = [];
				state.isLoading = false;
			});
	},
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async (user) => {
	const data = await getData('users/' + user.id + '/cart', {
		headers: { Authorization: 'Bearer ' + user.token },
	});
	return data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async (user) => {
	await postData(
		'users/' + user.id + '/cart',
		{ productVariantId: user.product._id, quantity: 1 },
		{
			headers: { Authorization: 'Bearer ' + user.token },
		}
	);
	const data = await getData('users/' + user.id + '/cart', {
		headers: { Authorization: 'Bearer ' + user.token },
	});
	return data;
});

export const removeFromCart = createAsyncThunk(
	'cart/removeFromCart',
	async (data) => {
		await deleteData('users/' + data.id + '/cart/' + data.idRemove, {
			headers: { Authorization: 'Bearer ' + data.token },
		});
		const newData = await getData('users/' + data.id + '/cart', {
			headers: { Authorization: 'Bearer ' + data.token },
		});
		return newData;
	}
);

export const increaseQuantity = createAsyncThunk(
	'cart/increaseQuantity',
	async (data) => {
		await updateData(
			'users/' + data.id + '/cart/' + data.idUpdate,
			{ quantity: data.quantity },
			{
				headers: { Authorization: 'Bearer ' + data.token },
			}
		);
		const newData = await getData('users/' + data.id + '/cart', {
			headers: { Authorization: 'Bearer ' + data.token },
		});
		return newData;
	}
);

export const decreaseQuantity = createAsyncThunk(
	'cart/decreaseQuantity',
	async (data) => {
		await updateData(
			'users/' + data.id + '/cart/' + data.idUpdate,
			{ quantity: data.quantity },
			{
				headers: { Authorization: 'Bearer ' + data.token },
			}
		);
		const newData = await getData('users/' + data.id + '/cart', {
			headers: { Authorization: 'Bearer ' + data.token },
		});
		return newData;
	}
);

export const removeEntireCart = createAsyncThunk(
	'cart/removeEntireCart',
	async (data) => {
		await deleteData('users/' + data.id + '/cart/all', {
			headers: { Authorization: 'Bearer ' + data.token },
		});
		const newData = await getData('users/' + data.id + '/cart', {
			headers: { Authorization: 'Bearer ' + data.token },
		});
		return newData;
	}
);

export default cartSlice;
