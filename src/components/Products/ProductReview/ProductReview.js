import React from 'react';
import RatingBar from '../../RatingBar/RatingBar';
import { Button, Typography } from '@material-tailwind/react';
import { CheckBadgeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import AllReviewDialog from './AllReviewDialog';
import AddReviewDialog from './AddReviewDialog';
import { convertTimestampToRelativeTime } from '../../../utils';
import { useDispatch } from 'react-redux';
import usersSlice from '../../Users/UsersSlice';

const ProductReview = ({
	ratingData,
	reviewData,
	productId,
	token,
	mutate,
}) => {
	const dispatch = useDispatch();
	const reviewDataToShow = [...reviewData.slice(0, 3)];
	const openLoginDialog = () => {
		dispatch(usersSlice.actions.setLoginDialog(true));
	};
	return (
		<div className="w-full h-max border-solid border-[1px] border-gray-700 py-4 rounded-xl">
			{/* rating start  */}
			{reviewDataToShow.length > 0 ? (
				ratingData.totalStars > 0 ? (
					<div className="grid grid-cols-3">
						<div className="col-span-3 md:col-span-1 mb-4 md:mb-0 pb-2 md:pb-0 flex flex-col w-full px-1 border-solid border-b-[1px] md:border-b-0 md:border-r-[1px] border-gray-700 gap-1">
							<Typography className="text-text text-lg text-center font-medium">
								Total Reviews
							</Typography>
							<Typography className="text-highlight font-semibold text-3xl flex justify-center items-center gap-2">
								{ratingData.totalStars}
								<ShieldCheckIcon className="w-6 h-6 text-highlight" />
							</Typography>
						</div>
						<div className="col-span-1 flex flex-col w-full border-solid border-r-[1px] border-gray-700 gap-1 px-1">
							<Typography className="text-text text-lg font-medium text-center">
								Average Rating
							</Typography>
							<div className="flex items-center flex-col gap-2">
								<Typography className="text-highlight text-3xl font-semibold">
									{Math.floor(ratingData.averageRating * 10) /
										10}
								</Typography>
								<RatingBar
									value={Math.floor(ratingData.averageRating)}
									relatedStyle={
										'text-highlight text-sm w-4 h-4'
									}
									unrelatedStyle={
										'text-text text-sm w-4 h-4 '
									}
									wrapperStyle={
										'flex flex-row gap-1 hover:opacity-60'
									}
								/>
							</div>
						</div>
						<div className="col-span-2 md:col-span-1 flex flex-col w-full px-4">
							{ratingData.stars.reverse().map((item, index) => {
								const rate = Math.round(
									item.statisticalPercentage
								);
								return (
									<div
										key={`rating-${index}`}
										className="flex items-center flex-row justify-start gap-3"
									>
										<Typography className="text-text text-base text-right w-3 font-semibold">
											{item.star}
										</Typography>
										<div className="w-full h-full flex items-center gap-2">
											<div
												className={`bg-highlight h-[6px] rounded-[3px]`}
												style={{
													width: `${rate}%`,
												}}
											></div>
											<Typography className="text-highlight text-xs font-medium">
												{rate}%
											</Typography>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<></>
				)
			) : (
				<Typography className="font-medium text-lg px-4 text-center">
					No reviews yet. Write the first review for this product ?
				</Typography>
			)}

			{/* reviews  */}
			<div className="flex flex-col gap-2 px-4 mt-4 border-solid border-t-[1px] border-gray-700">
				{reviewDataToShow.length > 0 &&
					reviewDataToShow?.map((item) => {
						return (
							<div
								key={item._id}
								className="py-4 md:px-2 border-solid border-b-[1px] border-gray-700"
							>
								<div className="flex gap-1 items-center">
									<Typography className="text-text font-semibold text-lg ">
										{item.user.username}
									</Typography>
									<CheckBadgeIcon className="w-5 h-5 text-highlight" />
									<Typography className="text-text text-sm ml-2 italic">
										{convertTimestampToRelativeTime(
											item.createdAt
										)}
									</Typography>
								</div>
								<RatingBar
									value={Math.floor(item.ratingStar)}
									relatedStyle={
										'text-highlight text-sm w-4 h-4'
									}
									unrelatedStyle={
										'text-text text-sm w-4 h-4 '
									}
									wrapperStyle={'flex flex-row gap-1 my-2'}
								/>

								<Typography className="text-text text-sm">
									{item.content}
								</Typography>
								<div className="flex gap-4 mt-4">
									{item?.images.map((img) => (
										<div key={img.imageName}>
											<img
												className="h-20 w-20 rounded-lg object-cover object-center"
												src={img.imageUrl}
												alt="reviews"
											/>
										</div>
									))}
								</div>
							</div>
						);
					})}

				<div
					className={`md:px-2 pt-2 ${
						reviewDataToShow.length > 0
							? 'grid grid-cols-2 gap-4'
							: 'flex justify-center'
					}`}
				>
					{reviewDataToShow.length > 0 && (
						<AllReviewDialog data={reviewData} />
					)}
					{token === '' ? (
						<Button
							variant="outlined"
							onClick={openLoginDialog}
							className="bg-highlight text-main"
						>
							Write Review
						</Button>
					) : (
						<AddReviewDialog
							productId={productId}
							token={token}
							mutate={mutate}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductReview;
