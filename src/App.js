import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import RouterComponent from './routes';
import Notification from './components/Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishList } from './components/WishList/WishListSlice';

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users);
	useEffect(() => {
		if (user.accessToken !== '') {
			dispatch(fetchWishList({ token: user.accessToken }));
		}
	}, [dispatch, user]);
	const router = RouterComponent();
	return (
		<div className="bg-background relative w-full min-h-screen text-text font-body *:selection:!text-gray-900 *:selection:!bg-highlight">
			<RouterProvider router={router} />
			<Notification />
		</div>
	);
}

export default App;
