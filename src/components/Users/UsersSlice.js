import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData, postData } from '../../api';
import { jwtDecode } from 'jwt-decode';

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		accessToken: '',
		userInfo: {},
		isError: false,
		openLoginDialog: false,
	},
	reducers: {
		setLoginDialog: (state, action) => {
			state.openLoginDialog = action.payload;
		},
		setToken: (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.userInfo = jwtDecode(action.payload.accessToken).UserInfo;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.openLoginDialog = false;
				state.userInfo = jwtDecode(action.payload.accessToken).UserInfo;
			})
			.addCase(signIn.rejected, (state) => {
				state.accessToken = '';
			})
			.addCase(logOut.fulfilled, (state) => {
				state.accessToken = '';
				state.userInfo = {};
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.userInfo = jwtDecode(action.payload.accessToken).UserInfo;
			})
			.addCase(refreshToken.rejected, (state) => {
				state.accessToken = '';
			});
	},
});

export const signIn = createAsyncThunk('users/signIn', async (data) => {
	const res = await postData('auth', data);
	return res?.data;
});

export const signUp = createAsyncThunk('users/signUp', async (data) => {
	const res = await postData('auth/register', data);
	return res?.data;
});

export const logOut = createAsyncThunk('users/logOut', async () => {
	await postData('auth/logout');
});

export const refreshToken = createAsyncThunk('users/refreshToken', async () => {
	const res = await getData('auth/refresh');
	return res;
});

export default usersSlice;
