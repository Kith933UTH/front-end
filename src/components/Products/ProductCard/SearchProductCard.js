import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import RatingBar from '../../RatingBar/RatingBar';
import { FormatNumber, isTimestampPast } from '../../../utils';
import useSWR from 'swr';
import { getData } from '../../../api';
import SWRconfig from '../../../api/SWRconfig';

export function SearchProductCard({ data }) {
	const path =
		data.productType === 'Laptop'
			? 'laptops'
			: data.productType === 'SmartPhone'
			? 'smartPhones'
			: data.productType === 'Tablet'
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
		'products/' + path + '/' + data._id + '/fullInfos',
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
						</div>
					</CardBody>

					<CardFooter className="pt-0 px-4 flex flex-row gap-1 justify-center items-center">
						<Link
							to={'/' + path + '/' + productData._id}
							className="w-full"
						>
							<Button
								ripple={true}
								fullWidth
								className="bg-highlight !h-8 py-1 rounded-3xl border-text border-solid border-[1px] text-main shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
							>
								Buy now
							</Button>
						</Link>
					</CardFooter>
				</div>
			</Card>
		)
	);
}
