import React from 'react';
import { GoGoal } from 'react-icons/go';
import {
	Typography,
	ListItemPrefix,
	Card,
	CardHeader,
	CardBody,
} from '@material-tailwind/react';

import avt1 from '../assets/img/about-avatar-1.png';
import avt2 from '../assets/img/about-avatar-2.png';
import avt3 from '../assets/img/about-avatar-3.png';
import avt4 from '../assets/img/about-avatar-4.png';

const AboutPage = () => {
	return (
		<>
			<div className="mt-4 rounded-xl bg-gradient-to-r from-blue-gray-800 to-black-500 py-6 max-w-[1200px]">
				<Typography
					className="flex align-center justify-center"
					variant="h4"
				>
					ABOUT TECHSHOP
				</Typography>
				<Typography className="py-4 text-xl px-10 tablet:px-28 flex align-center justify-center">
					TECHSHOP is passionate about technology and driven by
					innovation. We dream, we dare and we strive to create an
					effortless and joyful digital life for everyone. We're
					always in search of incredible ideas and experiences, and we
					aspire to deliver the incredible in everything we do.
				</Typography>
			</div>

			<div className="max-w-[1200px] flex flex-col">
				<Typography
					className="pt-8 -mb-2 tablet:mb-0 flex justify-center"
					variant="h4"
				>
					OUR GOALS
				</Typography>
				<div className="w-full mb-16 grid grid-cols-1 gap-4 md:grid-cols-3 py-4 max-w-[1200px]">
					<div className="items-center text-xl bg-gradient-to-r from-gray-800 to-gray-900 border py-4 my-2 rounded-lg px-10 flex-col">
						<ListItemPrefix>
							<GoGoal className="size-16" />
						</ListItemPrefix>
						<Typography className="text-xl mt-3">
							Increase representation of diverse voices in the
							design of products and solutions.
						</Typography>
					</div>
					<div className="items-center text-xl bg-gradient-to-r from-gray-800 to-gray-900 border py-4 my-2 rounded-lg px-10 flex-col">
						<ListItemPrefix>
							<GoGoal className="size-16" />
						</ListItemPrefix>
						<Typography className="text-xl mt-3">
							Use our scale and global presence to raise awareness
							and champion inclusivity.
						</Typography>
					</div>
					<div className="items-center text-xl bg-gradient-to-r from-gray-800 to-gray-900 border py-4 my-2 rounded-lg px-10 flex-col">
						<ListItemPrefix>
							<GoGoal className="size-16" />
						</ListItemPrefix>
						<Typography className="text-xl mt-3">
							Drive ambitious goals and targets for the business
							around Diversity and Inclusion in all its forms.
						</Typography>
					</div>
				</div>
			</div>

			<Typography
				className="pt-4 flex items-center justify-center m-4"
				variant="h4"
			>
				OUR TEAM
			</Typography>
			<div className="w-full mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4">
				<Card className="bg-main">
					<CardHeader floated={false} className="h-52">
						<img src={avt3} alt="profile" />
					</CardHeader>
					<CardBody className="text-center">
						<Typography
							variant="h5"
							className="mb-2 text-text text-xl"
						>
							Nguyễn Huỳnh Phước
						</Typography>
						<Typography
							className="font-medium text-text"
							textGradient
						>
							CEO / Co-Founder
						</Typography>
					</CardBody>
				</Card>

				<Card className="bg-main">
					<CardHeader floated={false} className="h-52">
						<img src={avt1} alt="profile" />
					</CardHeader>
					<CardBody className="text-center">
						<Typography
							variant="h5"
							className="mb-2 text-text text-xl"
						>
							Nguyễn Hồng Vũ
						</Typography>
						<Typography
							className="font-medium text-text"
							textGradient
						>
							CEO / Co-Founder
						</Typography>
					</CardBody>
				</Card>

				<Card className="bg-main">
					<CardHeader floated={false} className="h-52">
						<img src={avt2} alt="profile" />
					</CardHeader>
					<CardBody className="text-center">
						<Typography
							variant="h5"
							className="mb-2 text-text text-xl"
						>
							Nguyễn Trung Tuấn Kiệt
						</Typography>
						<Typography
							className="font-medium text-text"
							textGradient
						>
							CEO / Co-Founder
						</Typography>
					</CardBody>
				</Card>

				<Card className="bg-main">
					<CardHeader floated={false} className="h-52">
						<img src={avt4} alt="profile" />
					</CardHeader>
					<CardBody className="text-center">
						<Typography
							variant="h5"
							className="mb-2 text-text text-xl"
						>
							Nguyễn Thị Phương Trinh
						</Typography>
						<Typography
							className="font-medium text-text"
							textGradient
						>
							CEO / Co-Founder
						</Typography>
					</CardBody>
				</Card>
			</div>
		</>
	);
};

export default AboutPage;
