import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: { show: false, type: '', message: '' },
	reducers: {
		showNotification: (state, action) => {
			state = {
				show: true,
				type: action.payload.type,
				message: action.payload.message,
			};
			return state;
		},
		hideNotification: (state) => {
			state = {
				show: false,
				type: '',
				message: '',
			};
			return state;
		},
	},
});

export default notificationSlice;
