import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import ProductCommentItem from './ProductCommentItem';

const AllCommentsDialog = ({ data, buttonTitle, productId, token, mutate }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	return (
		<>
			<Button
				onClick={handleOpen}
				variant="outlined"
				className="bg-transparent border-solid border-[1px] border-gray-700 text-highlight"
			>
				{buttonTitle}
			</Button>
			<Dialog
				open={open}
				size="sm"
				handler={handleOpen}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
				className="bg-background shadow-md shadow-gray-800 *:selection:!text-gray-900 *:selection:!bg-highlight"
			>
				<DialogBody className=" h-[80vh] overflow-y-scroll">
					{data.length > 0 && (
						<div className="flex flex-col gap-2 px-0 md:px-4 ">
							{data.map((item, index, arr) => {
								return (
									<div
										key={item._id}
										className={`py-4 px-2 ${
											index !== arr.length - 1 &&
											'border-solid border-b-[1px] border-gray-700'
										}`}
									>
										<ProductCommentItem
											data={item}
											token={token}
											mutate={mutate}
											closeDialog={handleOpen}
										/>
									</div>
								);
							})}
						</div>
					)}
				</DialogBody>
				<DialogFooter className="border-solid border-t-[1px] border-gray-700 py-2">
					<Button
						variant="text"
						color="red"
						onClick={handleOpen}
						className="text-sm"
					>
						<span>Close</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default AllCommentsDialog;
