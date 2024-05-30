import React from 'react';
import DetailItem from './DetailItem';

const TabletDetail = ({ detailList, subData }) => {
	return (
		<>
			<div>
				{/* Screen */}
				{detailList.screen && (
					<DetailItem list={detailList.screen} title={'Screen'} />
				)}
				{/* osAndCpu */}
				{detailList.operatingSystemAndCPU && (
					<DetailItem
						list={detailList.operatingSystemAndCPU}
						title={'Operating System, CPU'}
					/>
				)}

				{/* ramRom  */}
				{detailList.ramRom && (
					<DetailItem
						list={
							subData && subData.length > 0
								? subData.concat(detailList.ramRom)
								: detailList.ramRom
						}
						title={'Memory, Storage'}
					/>
				)}

				{/* camera */}
				{detailList.camera && (
					<DetailItem
						list={detailList.camera}
						title={'Main camera'}
					/>
				)}

				{/* selfie */}
				{detailList.selfie && (
					<DetailItem
						list={detailList.selfie}
						title={'Selfie camera'}
					/>
				)}

				{/* connection */}
				{detailList.connection && (
					<DetailItem
						list={detailList.connection}
						title={'Connection'}
					/>
				)}

				{/* utility */}
				{detailList.utility && (
					<DetailItem list={detailList.utility} title={'Utilities'} />
				)}
				{/* batteryAndCharger */}
				{detailList.batteryAndCharger && (
					<DetailItem
						list={detailList.batteryAndCharger}
						title={'Battery'}
					/>
				)}

				{/* generalInformation */}
				{detailList.generalInformation && (
					<DetailItem
						list={detailList.generalInformation}
						title={'General information'}
					/>
				)}
			</div>
		</>
	);
};

export default TabletDetail;
