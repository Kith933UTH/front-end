import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import RatingBar from '../../RatingBar/RatingBar';
import { FormatNumber, isTimestampPast } from '../../../utils';
import useSWR from 'swr';
import { getData } from '../../../api';
import SWRconfig from '../../../api/SWRconfig';
import RemoveFromWishListDialog from '../../Dialog/RemoveFromWishListDialog';
import { TrashIcon } from '@heroicons/react/24/outline';

export function WishListProductCard({ data, mutate }) {
	const path =
		data.productType === 'Laptop'
			? 'laptops'
			: data.productType === 'SmartPhone'
			? 'smartPhones'
			: data.productType === 'tablet'
			? 'tablets'
			: data.productType === 'SmartWatch'
			? 'smartWatches'
			: data.productType === 'Charger'
			? 'chargers'
			: data.productType === 'Cable'
			? 'cables'
			: data.productType === 'Headphone'
			? 'headphones'
			: data.productType === 'Keyboard'
			? 'keyboards'
			: data.productType === 'Mouse'
			? 'mouses'
			: '';

	const { data: productData, error: productError } = useSWR(
		'products/' + path + '/' + data.product._id + '/fullInfos',
		getData,
		SWRconfig
	);

	return (
		!productError &&
		productData && (
			<Card className={`w-full bg-main shadow-md shadow-main`}>
				<div className={`flex flex-col flex-1`}>
					<Link
						to={'/' + path + '/' + productData._id}
						className="[&_p]:hover:text-highlight [&>*:first-child]:hover:scale-105"
					>
						<CardHeader
							shadow={false}
							floated={false}
							className={`h-48 mb-4 duration-500 bg-transparent`}
						>
							<img
								src={productData.variants[0].image.imageUrl}
								alt={productData.variants[0].image.imageName}
								className="h-full w-full object-contain"
							/>
						</CardHeader>
						<div className="px-4 flex items-baseline justify-between gap-2">
							<Typography
								variant="paragraph"
								className={`font-medium text-text text-lg hover:text-highlight`}
							>
								{productData.name}
							</Typography>
							<div className="flex flex-row">
								<span className="w-4 h-4 rounded-full bg-red-400 border-solid border-white border-[1px] -ml-1" />
								<span className="w-4 h-4 rounded-full bg-red-500 border-solid border-white border-[1px] -ml-1" />
								<span className="w-4 h-4 rounded-full bg-red-600 border-solid border-white border-[1px] -ml-1" />
								<span className="w-4 h-4 rounded-full bg-red-700 border-solid border-white border-[1px] -ml-1" />
							</div>
						</div>
					</Link>

					<CardBody className="px-4 pt-2 pb-4 flex flex-col flex-1 justify-between">
						<Typography
							variant="paragraph"
							className="font-normal mb-auto text-sm opacity-75 text-text !line-clamp-2"
						>
							{productData.brand}
						</Typography>
						<div>
							<Typography className="font-medium text-highlight">
								{FormatNumber(
									isTimestampPast(
										productData.variants[0].discount
											.discountEndDate
									)
										? productData.variants[0].price
										: productData.variants[0].price -
												(productData.variants[0].price *
													productData.variants[0]
														.discount
														.discountPercentage) /
													100
								)}{' '}
								VND
							</Typography>
							{productData.variants[0].discount
								.discountPercentage > 0 &&
								!isTimestampPast(
									productData.variants[0].discount
										.discountEndDate
								) && (
									<Typography className={`text-text`}>
										<span className="line-through">
											{FormatNumber(
												productData.variants[0].price
											)}{' '}
											VND
										</span>{' '}
										<span className="text-sm">
											-
											{
												productData.variants[0].discount
													.discountPercentage
											}
											%
										</span>
									</Typography>
								)}
							<div className="w-full flex justify-between items-start">
								<div className="flex gap-4 items-center mt-1">
									<RatingBar
										value={
											productData.ratingStarStatistics
												.averageRating
										}
										relatedStyle={
											'text-highlight text-sm w-4 h-4'
										}
										unrelatedStyle={
											'text-text text-sm w-4 h-4 '
										}
										wrapperStyle={
											'flex flex-row gap-1 hover:opacity-60 h-full'
										}
									/>
									<Typography className="text-sm font-semibold text-text">
										{
											productData.ratingStarStatistics
												.totalStars
										}
									</Typography>
								</div>
								<RemoveFromWishListDialog
									icon={
										<TrashIcon className="h-6 w-6 text-red-700" />
									}
									buttonStyle={
										'h-8 w-8 rounded-3xl bg-main  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
									}
									idRemove={data._id}
									productName={data.product.name}
									mutate={mutate}
								/>
							</div>
						</div>
					</CardBody>
					{/* 
					<CardFooter className="pt-0 px-4 pb-2 flex flex-row gap-1 justify-end items-center">
						<RemoveFromWishListDialog
							icon={
								<TrashIcon className="h-6 w-6 text-red-700" />
							}
							buttonStyle={
								'h-8 w-8 rounded-3xl bg-main  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
							}
							idRemove={data._id}
							productName={data.product.name}
							mutate={mutate}
						/>
					</CardFooter> */}
				</div>
			</Card>
		)
	);
}
