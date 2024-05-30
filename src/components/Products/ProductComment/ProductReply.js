import {
	Timeline,
	TimelineBody,
	TimelineConnector,
	TimelineHeader,
	TimelineIcon,
	TimelineItem,
	Typography,
} from '@material-tailwind/react';
import React from 'react';
import { convertTimestampToRelativeTime } from '../../../utils';

const ProductReply = ({ data, isLoading, error }) => {
	return (
		<Timeline className="mt-3 px-4 pr-0 md:pr-4 pt-4 rounded-lg bg-main relative before:absolute before:border-solid before:border-[10px] before:border-b-main before:border-t-transparent before:border-r-transparent before:border-l-transparent before:top-[-18px] before:left-[16px]">
			{isLoading && (
				<div className="animate-pulse">
					<Typography
						as="div"
						variant="h1"
						className="mb-3 h-4 w-[40%] rounded-full bg-gray-700"
					>
						&nbsp;
					</Typography>
					<Typography
						as="div"
						variant="paragraph"
						className="mb-4 h-3 w-full rounded-full bg-gray-700"
					>
						&nbsp;
					</Typography>
				</div>
			)}
			{!error &&
				data &&
				data.map((rep, index, arr) => (
					<TimelineItem key={rep._id}>
						{index !== arr.length - 1 && <TimelineConnector />}
						<TimelineHeader className="h-3">
							<TimelineIcon className="bg-highlight" />
							<Typography className="text-text font-semibold text-base ">
								{rep.user.username}
							</Typography>
							<Typography className="text-text text-sm ml-2 italic">
								{convertTimestampToRelativeTime(rep.createdAt)}
							</Typography>
						</TimelineHeader>
						<TimelineBody className="pb-6">
							<Typography className="text-text text-sm">
								{rep.content}
							</Typography>
						</TimelineBody>
					</TimelineItem>
				))}
		</Timeline>
	);
};

export default ProductReply;
