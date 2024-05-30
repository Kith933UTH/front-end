import React from 'react';
import DetailItem from './DetailItem';

const SmartWatchDetail = ({ detailList }) => {
	return (
		<>
			<div>
				{/* Screen */}
				{detailList.screen && (
					<DetailItem list={detailList.screen} title={'Screen'} />
				)}

				{/* design  */}
				{detailList.design && (
					<DetailItem list={detailList.design} title={'Design'} />
				)}

				{/* utilities */}
				{detailList.utility && (
					<DetailItem list={detailList.utility} title={'Utilities'} />
				)}

				{/* battery */}
				{detailList.battery && (
					<DetailItem list={detailList.battery} title={'Battery'} />
				)}
				{/* configurationAndConnection */}
				{detailList.configurationAndConnection && (
					<DetailItem
						list={detailList.configurationAndConnection}
						title={'Configuration, Connection'}
					/>
				)}

				{/* additionalInformation */}
				{detailList.additionalInformation && (
					<DetailItem
						list={detailList.additionalInformation}
						title={'Other information'}
					/>
				)}
			</div>
		</>
	);
};

export default SmartWatchDetail;
