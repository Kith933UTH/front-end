import React, { useEffect, useState } from 'react';
import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from './ProductCard/ProductCard';
import { ProductCardSkeleton } from './ProductCard/ProductCardSkeleton';
import { ScrollToTop } from '../../utils';
import { Typography } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './ProductsSlice';
import { remainProductListSelector } from '../../redux/Selector/ProductSelector';
import { getData } from '../../api';
import useSWR from 'swr';
import SWRconfig from '../../api/SWRconfig';

const perPage = 12;

const ProductList = ({ type }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProducts(type));
	}, [dispatch, type]);
	const productList = useSelector(remainProductListSelector);
	const isLogin = useSelector((state) => state.users.accessToken);

	const [active, setActive] = useState(1);
	const lengthOfPage = Math.ceil(productList?.data?.length / perPage);

	useEffect(() => setActive(1), [productList]);

	const next = () => {
		if (active === lengthOfPage) return;
		setActive(active + 1);
	};

	const prev = () => {
		if (active === 1) return;
		setActive(active - 1);
	};

	useEffect(() => {
		ScrollToTop();
	}, [active]);

	const user = useSelector((state) => state.users);

	const wishlistFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + user.accessToken },
		});
	const { data: wishListData, mutate } = useSWR(
		'/users/' + user.userInfo.id + '/favoriteProducts',
		wishlistFetcher,
		SWRconfig
	);

	return (
		<>
			<div className="w-full mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4">
				{productList.isLoading ? (
					<>
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
					</>
				) : !productList.isError &&
				  productList.data.length > 0 &&
				  wishListData ? (
					productList.data
						.map((product, index) =>
							index < active * perPage &&
							index >= (active - 1) * perPage ? (
								<ProductCard
									key={product._id}
									data={product}
									isLogin={isLogin !== ''}
									isInWishList={
										wishListData.filter(
											(item) =>
												item.product._id === product._id
										).length > 0
											? wishListData.filter(
													(item) =>
														item.product._id ===
														product._id
											  )
											: false
									}
									mutate={mutate}
								/>
							) : null
						)
						.filter((item) => item !== null)
				) : (
					<Typography className="font-semibold text-xl text-center w-full col-span-1 sm:col-span-2 md:col-span-3 desktop:col-span-4">
						Not found.
					</Typography>
				)}
			</div>
			{productList.data.length > 0 && (
				<Pagination
					lengthOfPage={lengthOfPage}
					active={active}
					next={next}
					prev={prev}
				/>
			)}
		</>
	);
};

export default ProductList;
