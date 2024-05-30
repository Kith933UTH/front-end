import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { postData } from '../../../api';
import { useDispatch } from 'react-redux';
import notificationSlice from '../../Notification/NotificationSlice';
import Loading from '../../Loading/Loading';
import ProductCommentItem from './ProductCommentItem';
import AllCommentsDialog from './AllCommentsDialog';
import usersSlice from '../../Users/UsersSlice';

const ProductComment = ({ commentData, productId, token, mutate }) => {
	const renderData = [...commentData.slice(0, 2)];
	const dispatch = useDispatch();
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);

	const handleCommitComment = () => {
		setLoading(true);
		postData(
			'comments',
			{ content: content, productId: productId },
			{
				headers: {
					Authorization: 'Bearer ' + token,
					// 'Content-Type': 'multipart/form-data;',
				},
			}
		)
			.then(() => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'success',
						message: 'Add review success',
					})
				);
				mutate();
				setContent('');
			})
			.catch((err) => {
				dispatch(
					notificationSlice.actions.showNotification({
						type: 'error',
						message: err.response.data.message || 'Error',
					})
				);
			})
			.finally(() => setLoading(false));
	};

	const openLoginDialog = () => {
		dispatch(usersSlice.actions.setLoginDialog(true));
	};

	return (
		<div className="w-full h-max border-solid border-[1px] border-gray-700 py-4 rounded-xl mt-6">
			<div className="flex flex-row items-center gap-2 rounded-md border-solid border-[1px] border-gray-700 bg-main mx-4 shadow-md shadow-main">
				<textarea
					rows={2}
					spellCheck={false}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Please ask your question, we will respond as soon as possible"
					className="rounded-lg text-text font-sans p-2 px-4 bg-transparent flex-1 placeholder:opacity-50"
				/>
				<div className="p-2">
					{loading ? (
						<Loading
							customStyle={'!min-h-6 !p-0'}
							sizeStyle={'h-6 w-6'}
						/>
					) : token === '' ? (
						<PaperAirplaneIcon
							className={`w-6 h-6 text-highlight hover:opacity-50 ${
								content === ''
									? 'pointer-events-none opacity-50'
									: ''
							}`}
							onClick={openLoginDialog}
						/>
					) : (
						<PaperAirplaneIcon
							className={`w-6 h-6 text-highlight hover:opacity-50 ${
								content === ''
									? 'pointer-events-none opacity-50'
									: ''
							}`}
							onClick={handleCommitComment}
						/>
					)}
				</div>
			</div>
			{renderData.length > 0 && (
				<div className="flex flex-col gap-2 px-4 mt-4 border-solid border-t-[1px] border-gray-700">
					{renderData.map((item) => {
						return (
							<div
								key={item._id}
								className={`py-4 md:px-2 
									border-solid border-b-[1px] border-gray-700
								`}
							>
								<ProductCommentItem
									data={item}
									token={token}
									mutate={mutate}
								/>
							</div>
						);
					})}
				</div>
			)}
			{commentData.length !== renderData.length && (
				<div className="w-full flex justify-center mt-4">
					<AllCommentsDialog
						data={commentData}
						buttonTitle={`See ${
							commentData.length - renderData.length
						} more comments`}
						productId={productId}
						token={token}
						mutate={mutate}
					/>
				</div>
			)}
		</div>
	);
};

export default ProductComment;
