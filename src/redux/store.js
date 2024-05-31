import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import usersSlice from '../components/Users/UsersSlice';
import productsSlice from '../components/Products/ProductsSlice';
import cartSlice from '../components/Cart/CartSlice';
import notificationSlice from '../components/Notification/NotificationSlice';
import wishlistSlice from '../components/WishList/WishListSlice';

const store = configureStore({
	reducer: {
		users: usersSlice.reducer,
		products: productsSlice.reducer,
		cart: cartSlice.reducer,
		wishlist: wishlistSlice.reducer,
		notification: notificationSlice.reducer,
	},
	middleware: () => [thunk], // sử dụng thunk middleware để sử lý bất đồng bộ
});

export default store;
