import { Typography } from '@material-tailwind/react';
import React from 'react';

const ProductSpecifications = ({ data, subData }) => {
	const filteredData = data?.details
		? data.details.filter((item) => item.value !== '')
		: [
				data?.processor ? data?.processor[0] : null,
				// data?.ramMemoryAndHardDrive
				// 	? data?.ramMemoryAndHardDrive[0]
				// 	: null,
				// subData?.ram ? subData?.ram : null,
				// subData?.hardDrive ? subData?.hardDrive : null,
				...subData,
				data?.screen ? data?.screen[0] : null,
				data?.design ? data?.design[0] : null,
				data?.battery ? data?.battery[0] : null,
				data?.configurationAndConnection
					? data?.configurationAndConnection[0]
					: null,
				data?.camera ? data?.camera[0] : null,
				data?.selfie ? data?.selfie[0] : null,
				data?.operatingSystemAndCPU
					? data?.operatingSystemAndCPU[0]
					: null,
				// subData?.rom ? subData?.rom : null,
				data?.connection ? data?.connection[0] : null,
				data?.batteryAndCharger ? data?.batteryAndCharger[0] : null,
				data?.utility ? data?.utility[0] : null,
				data?.generalInformation ? data?.generalInformation[0] : null,
				data?.graphicsAndAudio ? data?.graphicsAndAudio[0] : null,
				data?.connectionPortAndExpansionFeature
					? data?.connectionPortAndExpansionFeature[0]
					: null,
				data?.sizeAndWeight ? data?.sizeAndWeight[0] : null,
				data?.additionalInformation
					? data?.additionalInformation[0]
					: null,
		  ].filter((item) => item !== null);
	return (
		<div className="w-full border-gray-700 border-solid border-[1px] rounded-xl overflow-hidden">
			{filteredData?.map((item, index) => {
				return (
					<div
						className={`grid grid-cols-3 px-4 py-2 ${
							index % 2 === 0 ? 'bg-main' : ''
						}`}
						key={item.title}
					>
						<div className="col-span-1">
							<Typography className="text-text text-base">
								{item.title}:
							</Typography>
						</div>
						<div className="col-span-2">
							<Typography className="text-text">
								{item.value}
							</Typography>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ProductSpecifications;
