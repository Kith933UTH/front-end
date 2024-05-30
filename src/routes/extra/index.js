import Checkout from '../../components/Checkout/Checkout';
import Complete from '../../components/Checkout/Complete';
import SearchProductList from '../../components/Products/SearchProductList';
import AboutPage from '../../pages/AboutPage';
import CheckoutPage from '../../pages/CheckoutPage';
import ContactPage from '../../pages/ContactPage';
import PolicyPage from '../../pages/PolicyPage';
import SearchPage from '../../pages/SearchPage';
import WishListPage from '../../pages/WishListPage';

const ExtraRoute = [
	{
		path: 'checkout',
		element: <CheckoutPage />,
		children: [
			{
				index: true,
				element: <Checkout />,
			},
			{
				path: 'complete',
				element: <Complete />,
			},
		],
	},
	{
		path: 'about',
		element: <AboutPage />,
	},
	{
		path: 'policy',
		element: <PolicyPage />,
	},
	{
		path: 'contact',
		element: <ContactPage />,
	},
	{
		path: 'search',
		element: <SearchPage />,
		children: [
			{
				path: ':searchKey',
				element: <SearchProductList />,
			},
		],
	},
	{
		path: 'wishlist',
		element: <WishListPage />,
	},
];

export default ExtraRoute;
