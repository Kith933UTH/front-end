import React from 'react';
import { Breadcrumbs, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import DetailedConfiguration from './DetailedConfiguration/DetailedConfiguration.js';
import ProductCarousel from './ProductCarousel/ProductCarousel.js';
import ProductBuy from './ProductBuy/ProductBuy.js';
import ProductPolicy from './ProductPolicy/ProductPolicy.js';
import ProductSpecifications from './ProductSpecifications/ProductSpecifications.js';

import ProductCarouselSkeleton from './ProductCarousel/ProductCarouselSkeleton.js';
import ProductBuySkeleton from './ProductBuy/ProductBuySkeleton.js';
import ProductPolicySkeleton from './ProductPolicy/ProductPolicySkeleton.js';
import ProductSpecificationsSkeleton from './ProductSpecifications/ProductSpecificationsSkeleton.js';
import ProductReview from './ProductReview/ProductReview.js';
import ProductReviewSkeleton from './ProductReview/ProductReviewSkeleton.js';
import ProductComment from './ProductComment/ProductComment.js';
import useSWR from 'swr';
import SWRconfig from '../../api/SWRconfig.js';
import { getData } from '../../api/index.js';
import Loading from '../Loading/Loading.js';
import { useSelector } from 'react-redux';
import ProductCommentSkeleton from './ProductComment/ProductCommentSkeleton.js';

const ProductDetail = ({ id, cateName, catePath }) => {
	// const navigate = useNavigate();

	const token = useSelector((state) => state.users.accessToken);

	const {
		data: productData,
		error: productError,
		isLoading: productLoading,
	} = useSWR(
		'products/' + catePath + '/' + id + '/fullInfos',
		getData,
		SWRconfig
	);

	const {
		data: detailData,
		error: detailError,
		isLoading: detailLoading,
	} = useSWR(
		'products/' + catePath + '/' + id + '/details',
		getData,
		SWRconfig
	);

	const {
		data: reviewData,
		error: reviewError,
		isLoading: reviewLoading,
		mutate: reviewMutate,
	} = useSWR('reviews?productId=' + id, getData, SWRconfig);

	const {
		data: starData,
		error: starError,
		isLoading: starLoading,
		mutate: starMutate,
	} = useSWR('reviews/ratingStatistics?productId=' + id, getData, SWRconfig);

	const {
		data: commentData,
		error: commentError,
		isLoading: commentLoading,
		mutate: commentMutate,
	} = useSWR('/comments?productId=' + id, getData, SWRconfig);
	// 	{
	// 		userName: 'Phuoc',
	// 		comment:
	// 			"I've been using this product for over a month and it's still good",
	// 		time: '04/04/2024',
	// 		reply: [
	// 			{
	// 				userName: 'QTV',
	// 				comment:
	// 					"I've been using this product for over a month and it's still good",
	// 				time: '04/04/2024',
	// 			},
	// 			{
	// 				userName: 'Phuoc',
	// 				comment:
	// 					"I've been using this product for over a month and it's still good",
	// 				time: '04/04/2024',
	// 			},
	// 		],
	// 	},
	// 	{
	// 		userName: 'Kith',
	// 		comment:
	// 			"I've been using this product for over a month and it's still good",
	// 		time: '04/04/2024',
	// 		reply: [
	// 			{
	// 				userName: 'QTV',
	// 				comment:
	// 					"I've been using this product for over a month and it's still good",
	// 				time: '04/04/2024',
	// 			},
	// 			{
	// 				userName: 'Kith',
	// 				comment:
	// 					"I've been using this product for over a month and it's still good",
	// 				time: '04/04/2024',
	// 			},
	// 		],
	// 	},
	// ];

	return (
		<>
			<Breadcrumbs className="bg-transparent px-4 my-3 tablet:mt-0 text-text flex items-end">
				<Link to="/" className="opacity-60">
					<Typography className="text-text hover:opacity-60">
						<HomeIcon className="w-5 h-5 mb-1 text-text hover:opacity-60" />
					</Typography>
				</Link>
				<Link to={'/' + catePath}>
					<Typography
						className="text-text hover:opacity-60"
						// onClick={() => navigate(-1)}
					>
						{cateName}
					</Typography>
				</Link>
				<Link to={window.location.pathname}>
					<div className="text-highlight text-lg hover:opacity-60 font-sans">
						{productLoading ? (
							<Loading
								customStyle={'!min-h-7'}
								sizeStyle={'h-5 w-5'}
							/>
						) : (
							!productError && productData && productData.name
						)}
					</div>
				</Link>
			</Breadcrumbs>
			<div className="w-full mb-16 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-5 max-w-[1200px]">
				{/* product image  */}
				<div className="md:col-span-3 w-full lg:h-[380px] desktop:h-96">
					{detailLoading ? (
						<ProductCarouselSkeleton />
					) : (
						!detailError &&
						detailData?.highlightedImages && (
							<ProductCarousel
								imgList={detailData.highlightedImages.map(
									(item) => item.imageUrl
								)}
							/>
						)
					)}
				</div>
				{/* buy */}
				<div className="md:col-span-2">
					{productLoading ? (
						<ProductBuySkeleton />
					) : (
						!productError &&
						productData && <ProductBuy data={productData} />
					)}
				</div>

				{/* product policy */}
				{/* product specifications */}
				<div className="laptop:col-span-2 w-full md:col-span-5 col-span-1">
					{detailLoading || productLoading ? (
						<>
							<ProductPolicySkeleton />
							<ProductSpecificationsSkeleton />
						</>
					) : (
						!detailError &&
						!productError &&
						detailData &&
						productData && (
							<>
								<ProductPolicy type={cateName} />
								<ProductSpecifications
									data={detailData}
									subData={[
										productData?.rams
											? {
													title: 'RAM',
													value: productData.rams.join(
														', '
													),
											  }
											: null,
										productData?.hardDrives
											? {
													title: 'Hard drive',
													value: productData.hardDrives.join(
														', '
													),
											  }
											: null,
										productData?.roms
											? {
													title: 'ROM',
													value: productData.roms.join(
														', '
													),
											  }
											: null,
									].filter((item) => item)}
								/>
								<DetailedConfiguration
									data={detailData}
									type={cateName}
									subData={[
										productData?.rams
											? {
													title: 'RAM',
													value: productData.rams.join(
														', '
													),
											  }
											: null,
										productData?.hardDrives
											? {
													title: 'Hard drive',
													value: productData.hardDrives.join(
														', '
													),
											  }
											: null,
										productData?.roms
											? {
													title: 'ROM',
													value: productData.roms.join(
														', '
													),
											  }
											: null,
									].filter((item) => item)}
								/>
							</>
						)
					)}
				</div>

				{/* product reviews */}
				<div className="w-full laptop:col-span-3 md:col-span-5 col-span-1">
					{reviewLoading || starLoading ? (
						<ProductReviewSkeleton />
					) : (
						!reviewError &&
						!starError &&
						starData &&
						reviewData && (
							<ProductReview
								ratingData={starData}
								reviewData={reviewData ? reviewData : []}
								productId={id}
								token={token}
								mutate={[reviewMutate, starMutate]}
							/>
						)
					)}

					{commentLoading ? (
						<ProductCommentSkeleton />
					) : (
						!commentError &&
						commentData && (
							<ProductComment
								commentData={commentData}
								productId={id}
								token={token}
								mutate={commentMutate}
							/>
						)
					)}
				</div>
			</div>
		</>
	);
};

export default ProductDetail;
