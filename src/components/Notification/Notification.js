import { Alert } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notificationSlice from './NotificationSlice';

const Notification = () => {
	const dispatch = useDispatch();
	const notifyData = useSelector((state) => state.notification);

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(notificationSlice.actions.hideNotification());
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [dispatch, useSelector((state) => state.notification)]);

	return (
		<Alert
			open={notifyData.show}
			onClose={() =>
				dispatch(notificationSlice.actions.hideNotification())
			}
			className={`rounded-l-none rounded-md shadow-lg backdrop-blur-[1000px] fixed top-20 right-6 w-max border-l-4 border-[#2ec946] border-solid bg-[#2ec946]/10 font-medium text-[#2ec946] z-[10000] 
            ${
				notifyData?.type === 'error' &&
				'border-red-600 bg-red-600/10 text-red-600'
			}`}
			animate={{
				mount: { x: 0 },
				unmount: { x: 100 },
			}}
		>
			{notifyData?.message}
		</Alert>
	);
};

export default Notification;
