import { HeartIcon } from '@heroicons/react/24/outline';
import {
	HeartIcon as SolidHeartIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/solid';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
	IconButton,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import RatingBar from '../../RatingBar/RatingBar';
import AddToCartDialog from '../../Dialog/AddToCartDialog';
import { FormatNumber, isTimestampPast } from '../../../utils';
import { useDispatch } from 'react-redux';
import usersSlice from '../../Users/UsersSlice';
import AddToWishListDialog from '../../Dialog/AddToWishListDialog';
import RemoveFromWishListDialog from '../../Dialog/RemoveFromWishListDialog';

export function ProductCard(props) {
	const dispatch = useDispatch();
	const firstVariant = props.variant ? props.variant : props.data.variants[0];
	const isEndDate = isTimestampPast(firstVariant.discount.discountEndDate);
	const currentPrice = isEndDate
		? firstVariant.price
		: (firstVariant.price *
				(100 - firstVariant.discount.discountPercentage)) /
		  100;

	const openLoginDialog = () => {
		dispatch(usersSlice.actions.setLoginDialog(true));
	};

	return (
		<Card
			className={`w-full bg-main shadow-md shadow-main ${
				props?.detail ? 'grid md:grid-cols-5 gap-4' : ''
			}`}
		>
			<div
				className={`flex flex-col flex-1 ${
					props?.detail ? 'md:col-span-3' : ''
				}`}
			>
				<Link
					to={props.data._id}
					className="[&_p]:hover:text-highlight [&>*:first-child]:hover:scale-105"
				>
					<CardHeader
						shadow={false}
						floated={false}
						className={`h-48 mb-4 duration-500 bg-transparent ${
							props?.detail ? 'h-full' : ''
						}`}
					>
						<img
							src={firstVariant.image.imageUrl}
							alt={firstVariant.image.imageName}
							className="h-full w-full object-contain"
						/>
					</CardHeader>
					{!props.detail && (
						<div className="px-4 flex items-baseline justify-between gap-2">
							<Typography
								variant="paragraph"
								className={`font-medium text-text text-lg hover:text-highlight ${
									props?.detail ? 'text-2xl' : ''
								}`}
							>
								{props.data.name}
							</Typography>
							<div className="flex flex-row">
								<span className="w-4 h-4 rounded-full bg-red-400 border-solid border-white border-[1px] -ml-1" />
								<span className="w-4 h-4 rounded-full bg-red-500 border-solid border-white border-[1px] -ml-1" />
								<span className="w-4 h-4 rounded-full bg-red-600 border-solid border-white border-[1px] -ml-1" />
								<span className="w-4 h-4 rounded-full bg-red-700 border-solid border-white border-[1px] -ml-1" />
							</div>
						</div>
					)}
				</Link>
				{!props.detail && (
					<CardBody className="px-4 pt-2 pb-4 flex flex-col flex-1 justify-between">
						<Typography
							variant="paragraph"
							className="font-normal mb-auto text-sm opacity-75 text-text !line-clamp-2"
						>
							{props.data.brand}
						</Typography>
						<div>
							<Typography className="font-medium text-highlight">
								{FormatNumber(currentPrice)} VND
							</Typography>
							{firstVariant.discount.discountPercentage > 0 &&
								!isEndDate && (
									<Typography className={`text-text`}>
										<span className="line-through">
											{FormatNumber(firstVariant.price)}{' '}
											VND
										</span>{' '}
										<span className="text-sm">
											-
											{
												firstVariant.discount
													.discountPercentage
											}
											%
										</span>
									</Typography>
								)}

							<div className="flex gap-4 items-center mt-1">
								<RatingBar
									value={
										props.data.ratingStarStatistics
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
									{props.data.ratingStarStatistics.totalStars}
								</Typography>
							</div>
						</div>
					</CardBody>
				)}

				{!props.detail && (
					<CardFooter className="pt-0 px-4 flex flex-row gap-1 justify-between items-center">
						<Link to={props.data._id}>
							<Button
								ripple={true}
								className="bg-highlight !h-8 py-1 rounded-3xl border-text border-solid border-[1px] text-main shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
							>
								Buy now
							</Button>
						</Link>
						<div className="flex flex-row gap-1">
							{props?.isLogin && props.isLogin ? (
								<>
									<AddToCartDialog
										icon={
											<ShoppingCartIcon className="h-6 w-6 text-highlight" />
										}
										buttonStyle={
											'h-8 w-8 rounded-3xl bg-main shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
										}
										data={props.data}
									/>
									{props.isInWishList ? (
										<RemoveFromWishListDialog
											icon={
												<SolidHeartIcon className="h-6 w-6 text-highlight" />
											}
											buttonStyle={
												'h-8 w-8 rounded-3xl bg-main  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
											}
											idRemove={props.isInWishList[0]._id}
											productName={props.data.name}
											mutate={
												props?.mutate
													? props.mutate
													: undefined
											}
										/>
									) : (
										<AddToWishListDialog
											icon={
												<HeartIcon className="h-6 w-6 text-text" />
											}
											buttonStyle={
												'h-8 w-8 rounded-3xl bg-main shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
											}
											idProduct={props.data._id}
											productName={props.data.name}
											mutate={
												props?.mutate
													? props.mutate
													: undefined
											}
										/>
									)}
								</>
							) : (
								<>
									<IconButton
										ripple={true}
										className="h-8 w-8 rounded-3xl bg-main shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
										onClick={openLoginDialog}
									>
										<ShoppingCartIcon className="h-6 w-6 text-text" />
									</IconButton>
									<IconButton
										ripple={true}
										className="h-8 w-8 rounded-3xl bg-main  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
										onClick={openLoginDialog}
									>
										<HeartIcon className="h-6 w-6 text-text" />
									</IconButton>
								</>
							)}
						</div>
					</CardFooter>
				)}
			</div>
			{props.detail && (
				<div className="flex flex-col md:col-span-2">
					<Link to={props.data._id}>
						<div className="px-4 flex items-baseline justify-between gap-2">
							<Typography
								variant="paragraph"
								className={`font-medium text-text text-lg hover:text-highlight ${
									props?.detail ? 'text-2xl' : ''
								}`}
							>
								{props.data.name}
							</Typography>
							{/* <div className="flex flex-row">
								<span className="w-4 h-4 rounded-full bg-red-400 border-solid border-white border-[1px] -ml-1" />
								<span className="w-4 h-4 rounded-full bg-red-500 border-solid border-white border-[1px] -ml-1" />
								<span className="w-4 h-4 rounded-full bg-red-600 border-solid border-white border-[1px] -ml-1" />
								<span className="w-4 h-4 rounded-full bg-red-700 border-solid border-white border-[1px] -ml-1" />
							</div> */}
						</div>
					</Link>
					<div className="px-4 pt-2 pb-4 flex flex-col">
						<Typography
							variant="paragraph"
							className="font-normal text-sm mb-2 opacity-75 text-text !line-clamp-2"
						>
							{props.data.brand}
						</Typography>
						<div>
							<Typography className="font-medium text-highlight">
								{FormatNumber(currentPrice)} VND
							</Typography>
							{firstVariant.discount.discountPercentage > 0 && (
								<Typography className="text-text">
									<span className="line-through">
										{FormatNumber(firstVariant.price)} VND
									</span>{' '}
									<span className="text-sm">
										-
										{
											firstVariant.discount
												.discountPercentage
										}
										%
									</span>
								</Typography>
							)}
							<div className="flex gap-4 items-center mt-1">
								<RatingBar
									value={Math.floor(
										props.data.ratingStarStatistics
											.averageRating
									)}
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
									{props.data.ratingStarStatistics.totalStars}
								</Typography>
							</div>
						</div>
					</div>
					{props.children}
				</div>
			)}
		</Card>
	);
}
