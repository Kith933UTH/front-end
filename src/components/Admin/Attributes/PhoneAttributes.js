import { IconButton, Typography } from '@material-tailwind/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import AdminLayout from '../../../layouts/AdminLayout';

const AttributeItem = ({ list, title }) => {
	return (
		<div className="w-full bg-white rounded-md border-[1px] border-solid border-gray-300 shadow-sm shadow-gray-400">
			<Typography className="p-4 pb-2 text-base font-bold">
				{title}
			</Typography>
			<form className="px-4 py-2 pt-0 flex flex-col gap-4">
				{list.map((item) => (
					<input
						key={title + item.title}
						type="text"
						placeholder={item.title}
						defaultValue={item.title}
						required={true}
						spellCheck="false"
						className="h-min w-full font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
					></input>
				))}
				<input
					type="text"
					placeholder={''}
					required={true}
					spellCheck="false"
					className="h-min w-full font-sans transition-all text-sm font-medium leading-4 outline-none shadow-none bg-transparent py-2 px-3 text-main placeholder:text-gray-600 placeholder:font-normal border-[1px] border-solid border-gray-300 rounded-md focus:border-admin"
				></input>

				<div className="text-right">
					<button
						type="submit"
						className="w-min py-2 px-4 text-sm text-white font-semibold bg-admin border-[1px] border-solid border-gray-300 rounded-md hover:bg-strongAdmin"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

const PhoneAttributes = () => {
	const navigate = useNavigate();

	const detailData = {
		screen: [
			{ title: 'CPU technology' },
			{ title: 'Multiplier' },
			{ title: 'Number of streams' },
		],
		selfieCamera: [
			{ title: 'CPU technology' },
			{ title: 'Multiplier' },
			{ title: 'Number of streams' },
		],
		mainCamera: [
			{ title: 'CPU technology' },
			{ title: 'Multiplier' },
			{ title: 'Number of streams' },
		],
		osAndCpu: [
			{ title: 'CPU technology' },
			{ title: 'Multiplier' },
			{ title: 'Number of streams' },
		],
		memoryAndStorage: [
			{ title: 'CPU technology' },
			{ title: 'Multiplier' },
			{ title: 'Number of streams' },
		],
		connection: [
			{ title: 'CPU technology' },
			{ title: 'Multiplier' },
			{ title: 'Number of streams' },
		],
		battery: [
			{ title: 'CPU technology' },
			{ title: 'Multiplier' },
			{ title: 'Number of streams' },
		],
		utilities: [
			{ title: 'CPU technology' },
			{ title: 'Multiplier' },
			{ title: 'Number of streams' },
		],
		generalInformation: [
			{ title: 'CPU technology' },
			{ title: 'Multiplier' },
			{ title: 'Number of streams' },
		],
	};

	return (
		<AdminLayout>
			<div className="text-main">
				{/* title  */}
				<div className="flex gap-4 items-center">
					<IconButton
						size="sm"
						variant="outlined"
						className="border-main text-main focus:ring-transparent rounded-sm"
						onClick={() => navigate(-1)}
					>
						<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
					</IconButton>

					<Typography className="text-xl font-semibold my-4">
						Phone <span className="text-admin">Attributes (#)</span>
					</Typography>
				</div>
				<div className="w-full grid grid-cols-2 gap-4">
					{/* Screen */}
					<AttributeItem title={'Screen'} list={detailData.screen} />
					{/* Selfie camera */}
					<AttributeItem
						title={'Selfie camera'}
						list={detailData.selfieCamera}
					/>
					{/* Main camera */}
					<AttributeItem
						title={'Main camera'}
						list={detailData.mainCamera}
					/>
					{/* Operating System, CPU */}
					<AttributeItem
						title={'Operating System, CPU'}
						list={detailData.osAndCpu}
					/>
					{/* Memory, Storage */}
					<AttributeItem
						title={'Memory, Storage'}
						list={detailData.memoryAndStorage}
					/>
					{/* Connection */}
					<AttributeItem
						title={'Connection'}
						list={detailData.connection}
					/>
					{/* Battery */}
					<AttributeItem
						title={'Battery'}
						list={detailData.battery}
					/>
					{/* Utilities */}
					<AttributeItem
						title={'Utilities'}
						list={detailData.utilities}
					/>
					{/* General information */}
					<AttributeItem
						title={'General information'}
						list={detailData.generalInformation}
					/>
				</div>
			</div>
		</AdminLayout>
	);
};

export default PhoneAttributes;
