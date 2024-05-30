import React, { useEffect } from 'react';
import { Pagination } from '../Pagination/Pagination';
import { ProductCardSkeleton } from './ProductCard/ProductCardSkeleton';
import { ScrollToTop } from '../../utils';
import { Typography } from '@material-tailwind/react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import useSWR from 'swr';
import SWRconfig from '../../api/SWRconfig.js';
import { getData } from '../../api/index.js';
import { SearchProductCard } from './ProductCard/SearchProductCard.js';

const perPage = 10;

const SearchProductList = () => {
	const { searchKey } = useParams();

	const {
		data: searchData,
		error: searchError,
		isLoading: searchLoading,
	} = useSWR(
		'/products/list/search?text=' + searchKey.trim(),
		getData,
		SWRconfig
	);

	//navigate to home if key is empty
	const navigate = useNavigate();
	useEffect(() => {
		if (searchKey === '') navigate('/');
	}, [searchKey, navigate]);

	//handle pagination
	const [active, setActive] = React.useState(1);
	const lengthOfPage = Math.ceil(searchData?.length / perPage);
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
			{searchLoading && (
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

			{!searchError &&
				(searchData?.length > 0 ? (
					<>
						<Typography className="text-text text-2xl font-medium my-4">
							Found{' '}
							<span className="text-highlight font-semibold">
								{searchData.length}
							</span>{' '}
							products for
							<span className="text-highlight font-semibold">
								{' '}
								"{searchKey.trim()}"
							</span>{' '}
						</Typography>
						<div className="w-full mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5">
							{searchData
								.map((product, index) =>
									index < active * perPage &&
									index >= (active - 1) * perPage ? (
										<SearchProductCard
											key={product._id}
											data={product}
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
							Sorry, we couldn't find any products matching
							keywords{' '}
							<span className="text-highlight font-semibold">
								"{searchKey}"
							</span>
						</Typography>
						<ul className="list-disc mt-8 ml-4">
							<li>
								<Typography className="text-text text-base font-medium mt-4">
									Check the spelling of entered keywords
								</Typography>
							</li>
							<li>
								<Typography className="text-text text-base font-medium mt-4">
									Try again with another keyword
								</Typography>
							</li>
							<li>
								<Typography className="text-text text-base font-medium mt-4">
									Try again with more general keywords
								</Typography>
							</li>
							<li>
								<Typography className="text-text text-base font-medium mt-4">
									Try again with shorter keywords
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

export default SearchProductList;
