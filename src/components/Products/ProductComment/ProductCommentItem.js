import {
	ShieldCheckIcon,
	ChatBubbleLeftRightIcon,
	PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { convertTimestampToRelativeTime } from '../../../utils';
import ProductReply from './ProductReply';
import Loading from '../../Loading/Loading';
import { getData, postData } from '../../../api';
import { useDispatch } from 'react-redux';
import notificationSlice from '../../Notification/NotificationSlice';
import useSWR from 'swr';
import SWRconfig from '../../../api/SWRconfig';
import usersSlice from '../../Users/UsersSlice';

const ProductCommentItem = ({ data, token, mutate, closeDialog }) => {
	const dispatch = useDispatch();
	const [replyLoading, setReplyLoading] = useState(false);
	const [replyContent, setReplyContent] = useState('');
	const [openReply, setOpenRepLy] = useState(false);

	const {
		data: replyData,
		isLoading,
		error,
		mutate: replyMutate,
	} = useSWR('/comments/' + data._id + '/replyComments', getData, SWRconfig);

	const handleCommitReply = () => {
		setReplyLoading(true);
		postData(
			'comments/' + data._id + '/replyComments',
			{ content: replyContent },
			{
				headers: {
					Authorization: 'Bearer ' + token,
					// 'Content-Type': 'multipart/form-data;',
				},
			}
		)
			.then(() => {
				// dispatch(
				// 	notificationSlice.actions.showNotification({
				// 		type: 'success',
				// 		message: 'Reply success',
				// 	})
				// );
				mutate();
				replyMutate();
				setReplyContent('');
				setOpenRepLy(false);
			})
			.catch((err) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: err.response.data.message || 'Error',
					})
				);
			})
			.finally(() => setReplyLoading(false));
	};

	const openLoginDialog = () => {
		if (closeDialog) closeDialog();
		dispatch(usersSlice.actions.setLoginDialog(true));
	};

	return (
		<>
			<div className="flex gap-1 items-center">
				<Typography className="text-text font-semibold text-lg ">
					{data.user.username}
				</Typography>
				<ShieldCheckIcon className="w-5 h-5 text-highlight" />
				<Typography className="text-text text-sm ml-2 italic">
					{convertTimestampToRelativeTime(data.createdAt)}
				</Typography>
				<div className="flex-1 hidden md:block">
					{token === '' ? (
						<Typography
							className="text-highlight text-sm ml-auto w-min p-2 flex gap-1 items-center cursor-pointer hover:opacity-60"
							onClick={openLoginDialog}
						>
							<ChatBubbleLeftRightIcon className="w-4 h-4" />{' '}
							Reply
						</Typography>
					) : (
						<Typography
							className="text-highlight text-sm ml-auto w-min p-2 flex gap-1 items-center cursor-pointer hover:opacity-60"
							onClick={() => setOpenRepLy(!openReply)}
						>
							<ChatBubbleLeftRightIcon className="w-4 h-4" />{' '}
							Reply
						</Typography>
					)}
				</div>
			</div>

			<Typography className="text-text text-sm">
				{data.content}
			</Typography>

			{data.replyComments.length > 0 && (
				<ProductReply
					data={replyData}
					isLoading={isLoading}
					error={error}
				/>
			)}
			<div className="flex-1 block md:hidden">
				{token === '' ? (
					<Typography
						className="text-highlight text-sm ml-auto w-min p-2 flex gap-1 items-center cursor-pointer hover:opacity-60"
						onClick={openLoginDialog}
					>
						<ChatBubbleLeftRightIcon className="w-4 h-4" /> Reply
					</Typography>
				) : (
					<Typography
						className="text-highlight text-sm ml-auto w-min p-2 flex gap-1 items-center cursor-pointer hover:opacity-60"
						onClick={() => setOpenRepLy(!openReply)}
					>
						<ChatBubbleLeftRightIcon className="w-4 h-4" /> Reply
					</Typography>
				)}
			</div>
			{openReply && (
				<div className="flex flex-row items-center gap-2 md:mt-4 rounded-lg border-solid border-[1px] border-gray-700 bg-main mx-4 shadow-md shadow-main ">
					<textarea
						rows={1}
						spellCheck={false}
						value={replyContent}
						autoFocus={openReply}
						onChange={(e) => setReplyContent(e.target.value)}
						placeholder={'Reply to ' + data.user.username}
						className="rounded-lg text-text text-sm font-sans p-2 px-4 bg-transparent flex-1 placeholder:opacity-50 focus-visible:!outline-highlight"
					/>
					<div className="p-1">
						{replyLoading ? (
							<Loading
								customStyle={'!min-h-6 !p-0'}
								sizeStyle={'h-6 w-6'}
							/>
						) : (
							<PaperAirplaneIcon
								className={`w-6 h-6 text-highlight hover:opacity-50 ${
									replyContent === ''
										? 'pointer-events-none opacity-50'
										: ''
								}`}
								onClick={() => handleCommitReply()}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default ProductCommentItem;
