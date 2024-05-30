import React, { useEffect } from 'react';
import { Pagination } from '../Pagination/Pagination.js';
import { ProductCardSkeleton } from './ProductCard/ProductCardSkeleton.js';
import { ScrollToTop } from '../../utils/index.js';
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

import useSWR from 'swr';
import SWRconfig from '../../api/SWRconfig.js';
import { getData } from '../../api/index.js';
import { useSelector } from 'react-redux';
import { WishListProductCard } from './ProductCard/WishListProductCard.js';

const perPage = 10;

const WishListProductList = () => {
	const user = useSelector((state) => state.users);

	const wishlistFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + user.accessToken },
		});
	const {
		data: wishListData,
		error: wishListError,
		isLoading: wishListLoading,
		mutate,
	} = useSWR(
		'/users/' + user.userInfo.id + '/favoriteProducts',
		wishlistFetcher,
		SWRconfig
	);

	//handle pagination
	const [active, setActive] = React.useState(1);
	const lengthOfPage = Math.ceil(wishListData?.length / perPage);
	const next = () => {
		if (active === lengthOfPage) return;
		setActive(active + 1);
	};
	const prev = () => {
		if (active === 1) return;
		setActive(active - 1);
	};

	//scroll to top when change page
	useEffect(() => {
		ScrollToTop();
	}, [active]);

	return (
		<>
			{wishListLoading && (
				<div className="w-full mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5">
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
				</div>
			)}

			{!wishListError &&
				(wishListData?.length > 0 ? (
					<>
						<Typography className="text-text text-2xl font-medium my-4">
							You have{' '}
							<span className="text-highlight font-semibold">
								{wishListData.length}
							</span>{' '}
							products in your wish list.
						</Typography>
						<div className="w-full mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5">
							{wishListData
								.map((product, index) =>
									index < active * perPage &&
									index >= (active - 1) * perPage ? (
										<WishListProductCard
											key={product._id}
											data={product}
											mutate={mutate}
										/>
									) : null
								)
								.filter((item) => item !== null)}
						</div>
						<Pagination
							lengthOfPage={lengthOfPage}
							active={active}
							next={next}
							prev={prev}
						/>
					</>
				) : (
					<div className="w-full flex flex-col justify-center items-center ">
						<Typography className="text-text text-2xl font-semibold mt-32 text-center">
							You have not added any products to your wish list.
						</Typography>
						<ul className="list-disc mt-4 ml-4">
							<li>
								<Typography className="text-text text-base font-medium mt-4">
									Add products for faster access
								</Typography>
							</li>
							<li>
								<Typography className="text-text text-base font-medium mt-4">
									Receive product discount notifications
								</Typography>
							</li>
						</ul>
						<Link
							to="/"
							className="bg-transparent mt-8 inline-block py-2 px-4 border-solid rounded border-[1px] border-highlight text-highlight hover:bg-highlight hover:text-background delay-100 "
						>
							<Typography className="font-medium text-base normal-case">
								Back to Home
							</Typography>
						</Link>
					</div>
				))}
		</>
	);
};

export default WishListProductList;
