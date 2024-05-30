import AllOrder from '../../components/Users/Order/AllOrder';
import OrderDetail from '../../components/Users/Order/OrderDetail';
import Profile from '../../components/Users/Profile/Profile';
import UserPage from '../../pages/UserPage';

const UserRoute = {
	path: 'user',
	element: <UserPage />,
	children: [
		{
			index: true,
			element: <Profile />,
		},
		{
			path: 'order',
			children: [
				{
					index: true,
					element: <AllOrder />,
				},

				{
					path: ':orderId',
					element: <OrderDetail />,
				},
			],
		},
	],
};

export default UserRoute;
