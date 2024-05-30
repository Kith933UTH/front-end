import { Outlet, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminPage from '../pages/AdminPage';

import CateRoute from './category';
import AdminRoute from './admin';
import ExtraRoute from './extra';
import UserRoute from './user';
import { useSelector } from 'react-redux';

const RouterComponent = () => {
	const token = useSelector((state) => state.users.accessToken);
	const role = useSelector((state) => state.users.userInfo.role);

	const user = token !== '' ? UserRoute : {};
	const admin =
		role === 'Admin'
			? {
					path: 'admin',
					element: <AdminPage />,
					children: [...AdminRoute],
			  }
			: {};

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<MainLayout>
					<Outlet />
				</MainLayout>
			),
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				...CateRoute,
				...ExtraRoute,
				user,
			],
		},

		{
			path: '*',
			element: <NotFoundPage />,
		},
		admin,
	]);
	return router;
};

export default RouterComponent;
