import React from 'react';
import Information from './Information';
import Address from './Address';
import { useSelector } from 'react-redux';
import { getData } from '../../../api';
import SWRconfig from '../../../api/SWRconfig';
import useSWR from 'swr';
import Loading from '../../Loading/Loading';

const Profile = () => {
	const loggedUser = useSelector((state) => state.users);
	const userFetcher = (url) =>
		getData(url, {
			headers: { Authorization: 'Bearer ' + loggedUser.accessToken },
		});

	const { data, error, isLoading, mutate } = useSWR(
		'/users/' + loggedUser.userInfo.id,
		userFetcher,
		SWRconfig
	);

	return (
		<div className="w-full flex flex-col gap-6">
			{isLoading && (
				<>
					<div className="w-full bg-main rounded-md p-4">
						<Loading customStyle={'min-h-28'} />
					</div>
					<div className="w-full bg-main rounded-md p-4">
						<Loading customStyle={'min-h-52'} />
					</div>
				</>
			)}
			{!error && data && (
				<>
					<Information
						data={data}
						token={loggedUser.accessToken}
						mutate={mutate}
					/>
					<Address
						data={data}
						token={loggedUser.accessToken}
						mutate={mutate}
					/>
				</>
			)}
		</div>
	);
};

export default Profile;
