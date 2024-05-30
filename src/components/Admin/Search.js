import React from 'react';
import useSWR from 'swr';
import { getData } from '../../api';
import SWRconfig from '../../api/SWRconfig';
import { useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

const getPath = (value) => {
	const path =
		value === 'Laptop'
			? 'laptops'
			: value === 'SmartPhone'
			? 'smartPhones'
			: value === 'Tablet'
			? 'tablets'
			: value === 'SmartWatch'
			? 'smartWatches'
			: value === 'Charger'
			? 'chargers'
			: value === 'Cable'
			? 'cables'
			: value === 'Headphone'
			? 'headphones'
			: value === 'Keyboard'
			? 'keyboards'
			: value === 'Mouse'
			? 'mouses'
			: '';

	return path;
};

const Search = ({ searchKey, loading }) => {
	const token = useSelector((state) => state.users.accessToken);
	const searchUserFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + token },
		});

	const {
		data: searchProductData,
		error: searchProductError,
		isLoading: searchProductLoading,
	} = useSWR('/products/list/search?text=' + searchKey, getData, SWRconfig);

	const {
		data: searchUserData,
		error: searchUserError,
		isLoading: searchUserLoading,
	} = useSWR('/users/search?text=' + searchKey, searchUserFetcher, SWRconfig);

	return (
		<div className="absolute top-full -mt-1 bg-white rounded-md w-[550px] max-h-[300px] text-main font-medium shadow-md shadow-gray-300 border-gray-300 border-solid border-[1px]">
			{searchProductLoading || searchUserLoading ? (
				<Loading customStyle={'min-h-[300px]'} />
			) : searchProductError || searchUserError ? (
				<Typography className="font-medium text-lg p-4">
					No results for "{searchKey}"
				</Typography>
			) : searchProductData && searchUserData ? (
				searchProductData.length === 0 &&
				searchUserData.length === 0 ? (
					<Typography className="font-medium text-lg p-4">
						No results for "{searchKey}"
					</Typography>
				) : (
					<div className="max-h-[300px] flex flex-col p-4">
						<Typography className="font-medium text-lg">
							Results for "{searchKey}"
						</Typography>
						<hr className="mt-1 shadow-md shadow-gray-200 border-blue-gray-50 pointer-events-none" />
						<div className="flex-1 overflow-y-scroll">
							{searchProductData.length > 0 && (
								<>
									<Typography className="font-normal text-sm uppercase pt-2 pb-1">
										Products
									</Typography>
									{searchProductData.map((item) => (
										<Link
											to={
												'/admin/products/' +
												getPath(item.productType) +
												'/' +
												item._id
											}
											key={item._id}
										>
											<div className="p-2 pl-3 hover:bg-gray-200 rounded-md">
												<Typography className="font-semibold text-sm">
													{item.name}
												</Typography>
												<Typography className="font-normal text-sm">
													{item.brand}
												</Typography>
											</div>
										</Link>
									))}
								</>
							)}
							{searchUserData.length > 0 && (
								<>
									<Typography className="font-normal text-sm uppercase pt-2 pb-1">
										Customers
									</Typography>
									{searchUserData.map((item) => (
										<Link
											to={'/admin/customers/' + item._id}
											key={item._id}
										>
											<div className="p-2 pl-3 hover:bg-gray-200 rounded-md">
												<Typography className="font-semibold text-sm">
													{item.username}
												</Typography>
												<Typography className="font-normal text-sm">
													{item.email}
												</Typography>
											</div>
										</Link>
									))}
								</>
							)}
						</div>
					</div>
				)
			) : (
				<Typography className="font-medium text-lg p-4">
					No results for "{searchKey}"
				</Typography>
			)}
		</div>
	);
};

export default Search;
