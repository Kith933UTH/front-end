import React from 'react';
import DetailItem from './DetailItem';

const LaptopDetail = ({ detailList, subData }) => {
	return (
		<>
			<div>
				{/* processor  */}
				{detailList.processor && (
					<DetailItem
						list={detailList.processor}
						title={'Processor'}
					/>
				)}

				{/* ram, hard drive */}
				{detailList.ramMemoryAndHardDrive && (
					<DetailItem
						list={
							subData && subData.length > 0
								? subData.concat(
										detailList.ramMemoryAndHardDrive
								  )
								: detailList.ramMemoryAndHardDrive
						}
						title={'RAM, Hard Drive'}
					/>
				)}

				{/* Screen */}
				{detailList.screen && (
					<DetailItem list={detailList.screen} title={'Screen'} />
				)}

				{/* graphicsAndSound */}
				{detailList.graphicsAndAudio && (
					<DetailItem
						list={detailList.graphicsAndAudio}
						title={'Graphics, Sound'}
					/>
				)}
				{/* connectionPortsAndExpansionFeatures */}
				{detailList.connectionPortAndExpansionFeature && (
					<DetailItem
						list={detailList.connectionPortAndExpansionFeature}
						title={'Connection, Features'}
					/>
				)}

				{/* sizeAndWeight */}
				{detailList.sizeAndWeight && (
					<DetailItem
						list={detailList.sizeAndWeight}
						title={'Size, weight'}
					/>
				)}

				{/* otherInformation */}
				{detailList.otherInformation && (
					<DetailItem
						list={detailList.otherInformation}
						title={'Other information'}
					/>
				)}
			</div>
		</>
	);
};

export default LaptopDetail;
