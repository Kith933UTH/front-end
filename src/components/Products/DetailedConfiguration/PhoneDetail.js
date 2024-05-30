import React from 'react';
import DetailItem from './DetailItem';

const PhoneDetail = ({ detailList, subData }) => {
	return (
		<>
			<div>
				{/* Screen */}
				{detailList.screen && (
					<DetailItem list={detailList.screen} title={'Screen'} />
				)}

				{/* selfieCamera  */}
				{detailList.selfie && (
					<DetailItem
						list={detailList.selfie}
						title={'Selfie camera'}
					/>
				)}

				{/* mainCamera */}
				{detailList.camera && (
					<DetailItem
						list={detailList.camera}
						title={'Main camera'}
					/>
				)}

				{/* osAndCpu */}
				{detailList.operatingSystemAndCPU && (
					<DetailItem
						list={detailList.operatingSystemAndCPU}
						title={'Operating System, CPU'}
					/>
				)}
				{/* memoryAndStorage */}
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

				{/* connection */}
				{detailList.connection && (
					<DetailItem
						list={detailList.connection}
						title={'Connection'}
					/>
				)}

				{/* battery */}
				{detailList.batteryAndCharger && (
					<DetailItem
						list={detailList.batteryAndCharger}
						title={'Battery'}
					/>
				)}

				{/* utilities */}
				{detailList.utility && (
					<DetailItem list={detailList.utility} title={'Utilities'} />
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

export default PhoneDetail;
