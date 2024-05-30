import Dashboard from '../../components/Admin/Dashboard';
import ChooseNewProduct from '../../components/Admin/Products/ChooseNewProduct';
// import ChooseNewAttribute from '../../components/Admin/Attributes/ChooseNewAttribute';
import ProductsList from '../../components/Admin/Products/ProductsList';
import NewProduct from '../../components/Admin/Products/NewProduct';

//edit
import EditLaptop from '../../components/Admin/Products/Laptop/EditLaptop';
import EditPhone from '../../components/Admin/Products/Phone/EditPhone';
import EditTablet from '../../components/Admin/Products/Tablet/EditTablet';
import EditSmartwatch from '../../components/Admin/Products/Smartwatch/EditSmartwatch';
import EditCharger from '../../components/Admin/Products/Charger/EditCharger';
import EditCable from '../../components/Admin/Products/Cable/EditCable';
import EditHeadphone from '../../components/Admin/Products/Headphone/EditHeadphone';
import EditMouse from '../../components/Admin/Products/Mouse/EditMouse';
import EditKeyboard from '../../components/Admin/Products/Keyboard/EditKeyboard';

//attributes
// import LaptopAttributes from '../../components/Admin/Attributes/LaptopAttributes';
// import PhoneAttributes from '../../components/Admin/Attributes/PhoneAttributes';
// import TabletAttributes from '../../components/Admin/Attributes/TabletAttributes';
// import SmartwatchAttributes from '../../components/Admin/Attributes/SmartwatchAttributes';
// import ChargerAttributes from '../../components/Admin/Attributes/ChargerAttributes';
// import CableAttributes from '../../components/Admin/Attributes/CableAttributes';
// import HeadphoneAttributes from '../../components/Admin/Attributes/HeadphoneAttributes';
// import MouseAttributes from '../../components/Admin/Attributes/MouseAttributes';
// import KeyboardAttributes from '../../components/Admin/Attributes/KeyboardAttributes';

//orders
import OrderList from '../../components/Admin/Orders/OrderList';
import OrderDetail from '../../components/Admin/Orders/OrderDetail';

//customers
import CustomerList from '../../components/Admin/Customers/CustomerList';
import CustomerDetail from '../../components/Admin/Customers/CustomerDetail';

const AdminRoute = [
	{
		index: true,
		element: <Dashboard />,
	},
	{
		path: 'products',
		children: [
			{
				index: true,
				element: <ChooseNewProduct />,
			},
			{
				path: 'laptops',
				children: [
					{
						index: true,
						element: (
							<ProductsList title={'Laptop'} url={'laptops'} />
						),
					},
					{
						path: 'new',
						element: (
							<NewProduct title={'Laptop'} url={'laptops'} />
						),
					},
					// {
					// 	path: 'attributes',
					// 	element: <LaptopAttributes />,
					// },
					{ path: ':productId', element: <EditLaptop /> },
				],
			},
			{
				path: 'smartPhones',
				children: [
					{
						index: true,
						element: (
							<ProductsList
								title={'Smartphones'}
								url={'smartPhones'}
							/>
						),
					},
					{
						path: 'new',
						element: (
							<NewProduct
								title={'Smartphones'}
								url={'smartPhones'}
							/>
						),
					},
					// {
					// 	path: 'attributes',
					// 	element: <PhoneAttributes />,
					// },

					{ path: ':productId', element: <EditPhone /> },
				],
			},
			{
				path: 'tablets',
				children: [
					{
						index: true,
						element: (
							<ProductsList title={'Tablet'} url={'tablets'} />
						),
					},
					{
						path: 'new',
						element: (
							<NewProduct title={'Tablet'} url={'tablets'} />
						),
					},
					// {
					// 	path: 'attributes',
					// 	element: <TabletAttributes />,
					// },

					{ path: ':productId', element: <EditTablet /> },
				],
			},
			{
				path: 'smartwatches',
				children: [
					{
						index: true,
						element: (
							<ProductsList
								title={'Smartwatch'}
								url={'smartwatches'}
							/>
						),
					},
					{
						path: 'new',
						element: (
							<NewProduct
								title={'Smartwatch'}
								url={'smartwatches'}
							/>
						),
					},
					// {
					// 	path: 'attributes',
					// 	element: <SmartwatchAttributes />,
					// },

					{
						path: ':productId',
						element: <EditSmartwatch />,
					},
				],
			},
			{
				path: 'chargers',
				children: [
					{
						index: true,
						element: (
							<ProductsList title={'Charger'} url={'chargers'} />
						),
					},
					{
						path: 'new',
						element: (
							<NewProduct title={'Charger'} url={'chargers'} />
						),
					},
					// {
					// 	path: 'attributes',
					// 	element: <ChargerAttributes />,
					// },

					{ path: ':productId', element: <EditCharger /> },
				],
			},
			{
				path: 'cables',
				children: [
					{
						index: true,
						element: (
							<ProductsList title={'Cable'} url={'cables'} />
						),
					},
					{
						path: 'new',
						element: <NewProduct title={'Cable'} url={'cables'} />,
					},
					// {
					// 	path: 'attributes',
					// 	element: <CableAttributes />,
					// },

					{ path: ':productId', element: <EditCable /> },
				],
			},
			{
				path: 'headphones',
				children: [
					{
						index: true,
						element: (
							<ProductsList
								title={'Headphone'}
								url={'headphones'}
							/>
						),
					},
					{
						path: 'new',
						element: (
							<NewProduct
								title={'Headphone'}
								url={'headphones'}
							/>
						),
					},
					// {
					// 	path: 'attributes',
					// 	element: <HeadphoneAttributes />,
					// },

					{
						path: ':productId',
						element: <EditHeadphone />,
					},
				],
			},
			{
				path: 'mouses',
				children: [
					{
						index: true,
						element: (
							<ProductsList title={'Mouse'} url={'mouses'} />
						),
					},
					{
						path: 'new',
						element: <NewProduct title={'Mouse'} url={'mouses'} />,
					},
					// {
					// 	path: 'attributes',
					// 	element: <MouseAttributes />,
					// },

					{
						path: ':productId',
						element: <EditMouse />,
					},
				],
			},
			{
				path: 'keyboards',
				children: [
					{
						index: true,
						element: (
							<ProductsList
								title={'Keyboard'}
								url={'keyboards'}
							/>
						),
					},
					{
						path: 'new',
						element: (
							<NewProduct title={'Keyboard'} url={'keyboards'} />
						),
					},
					// {
					// 	path: 'attributes',
					// 	element: <KeyboardAttributes />,
					// },

					{
						path: ':productId',
						element: <EditKeyboard />,
					},
				],
			},
		],
	},
	// {
	// 	path: 'attributes',
	// 	children: [
	// 		{
	// 			index: true,
	// 			element: <ChooseNewAttribute />,
	// 		},
	// 	],
	// },
	{
		path: 'customers',
		children: [
			{ index: true, element: <CustomerList /> },
			{ path: ':customerId', element: <CustomerDetail /> },
		],
	},
	{
		path: 'orders',
		children: [
			{ index: true, element: <OrderList /> },
			{ path: ':orderId', element: <OrderDetail /> },
		],
	},
];

export default AdminRoute;
