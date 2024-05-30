import React from 'react';

import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

import homeProductLaptop from '../assets/img/home-product-laptop.png';
import homeProductPhone from '../assets/img/home-product-phone.png';
import homeProductTablet from '../assets/img/home-product-tablet.webp';
import homeProductSmartwatch from '../assets/img/home-product-smartwatch.avif';
import homeProductCharger from '../assets/img/home-product-charger.png';
import homeProductCable from '../assets/img/home-product-cable.png';
import homeProductHeadphone from '../assets/img/home-product-headphone.webp';
import homeProductMouse from '../assets/img/home-product-mouse.webp';
import homeProductKeyboard from '../assets/img/home-product-keyboard.png';
import iconIntel from '../assets/img/icon-intel-i9.jpg';
import iconA17 from '../assets/img/icon-a17-pro.jpg';
import iconM4 from '../assets/img/icon-m4.png';

const HomePage = () => {
	return (
		<div>
			{/* laptop  */}
			<div className="w-full flex flex-col mt-8 lg:mt-0 lg:flex-row p-4 lg:px-8 gap-4">
				<div className="flex-1 flex flex-col gap-2 justify-center">
					<Typography className="text-3xl lg:text-6xl font-bold font-serif">
						Stealth 16 Mercedes-
						<br />
						AMG Motorsport A13V
					</Typography>
					<Typography className="text-base lg:text-lg font-normal w-full lg:w-[70%]">
						Experience the legacy of luxury and speed. The
						unprecedented collaboration between Mercedes-AMG and MSI
						drives the ultimate luxury gaming experience.
					</Typography>
					<Link to="/laptops" className="w-min">
						<Typography className="text-sm font-semibold px-8 py-2 mt-4 rounded-full bg-highlight flex gap-2 w-min items-center text-main hover:opacity-70">
							<span>Explore </span>
							<FaArrowRightFromBracket />
						</Typography>
					</Link>
				</div>
				<div className="animate-float relative">
					<img
						className="w-[400px] h-[400px] object-contain mx-auto"
						src={homeProductLaptop}
						alt="home-product"
					></img>
					<div className="flex flex-col items-end gap-2 absolute bottom-24 right-0">
						<img
							className="w-20 h-20 object-contain "
							src={iconIntel}
							alt="stamp"
						/>
						<Typography className="text-xs text-right select-none">
							Powered by 13th Gen.
							<br /> Intel® Core™ i9 processors
						</Typography>
					</div>
				</div>
			</div>
			{/* phone  */}
			<div className="w-full flex flex-col-reverse lg:flex-row p-4 lg:px-8 gap-8 mt-20">
				<div className="animate-float relative">
					<img
						className="w-[400px] h-[400px] object-contain mx-auto"
						src={homeProductPhone}
						alt="home-product"
					></img>
					<div className="flex flex-col items-end gap-2 absolute bottom-24 right-0">
						<img
							className="w-20 h-20 object-contain "
							src={iconA17}
							alt="stamp"
						/>
						<Typography className="text-xs text-right select-none">
							A17 Pro processor.
							<br /> New 16‑core Neural Engine
						</Typography>
					</div>
				</div>
				<div className="flex-1 flex flex-col gap-2 justify-center lg:items-end">
					<Typography className="text-3xl lg:text-6xl font-bold font-serif lg:text-right">
						iPhone 15 Pro
					</Typography>
					<Typography className="text-base lg:text-lg font-normal w-full lg:w-[70%] lg:text-right">
						The first iPhone to feature an aerospace‑grade titanium
						design, using the same alloy that spacecraft use for
						missions to Mars.
					</Typography>
					<Link to="/smartPhones" className="w-min">
						<Typography className="text-sm font-semibold px-8 py-2 mt-4 rounded-full bg-highlight flex gap-2 w-min items-center text-main hover:opacity-70">
							<span>Explore </span>
							<FaArrowRightFromBracket />
						</Typography>
					</Link>
				</div>
			</div>
			{/* tablet  */}
			<div className="w-full flex flex-col mt-8 lg:mt-0 lg:flex-row p-4 lg:px-8 gap-4">
				<div className="flex-1 flex flex-col gap-2 justify-center">
					<Typography className="text-3xl lg:text-6xl font-bold font-serif">
						iPad Pro M4
						<br />
						Nano 5G
					</Typography>
					<Typography className="text-base lg:text-lg font-normal w-full lg:w-[70%]">
						The new iPad Pro — the thinnest Apple product ever —
						features a stunningly thin and light design, taking
						portability to a whole new level.
					</Typography>
					<Link to="/tablets" className="w-min">
						<Typography className="text-sm font-semibold px-8 py-2 mt-4 rounded-full bg-highlight flex gap-2 w-min items-center text-main hover:opacity-70">
							<span>Explore </span>
							<FaArrowRightFromBracket />
						</Typography>
					</Link>
				</div>
				<div className="animate-float relative">
					<img
						className="w-[400px] h-[400px] object-contain mx-auto"
						src={homeProductTablet}
						alt="home-product"
					></img>
					<div className="flex flex-col items-end gap-2 absolute bottom-24 right-0">
						<img
							className="w-20 h-20 object-contain "
							src={iconM4}
							alt="stamp"
						/>
						<Typography className="text-xs text-right select-none">
							Apple M4 Gen2 3nm.
							<br /> New 10-core CPU
						</Typography>
					</div>
				</div>
			</div>
			{/* smartwatch  */}
			<div className="w-full flex flex-col-reverse lg:flex-row p-4 lg:px-8 gap-8 mt-20">
				<div className="animate-float relative">
					<img
						className="w-[400px] h-[400px] object-contain mx-auto"
						src={homeProductSmartwatch}
						alt="home-product"
					></img>
					<div className="flex flex-col items-end gap-2 absolute bottom-24 right-0">
						{/* <img
							className="w-20 h-20 object-contain "
							src={iconSW}
							alt="stamp"
						/> */}
						<Typography className="text-xs text-right select-none">
							US military standards. <br />
							Exynos W920.
							<br /> Smooth One UI Watch OS
						</Typography>
					</div>
				</div>
				<div className="flex-1 flex flex-col gap-2 justify-center lg:items-end">
					<Typography className="text-3xl lg:text-6xl font-bold font-serif lg:text-right">
						Samsung Galaxy Watch5
					</Typography>
					<Typography className="text-base lg:text-lg font-normal w-full lg:w-[70%] lg:text-right">
						Monitor your health day and night. Achieve your health
						goals by measuring body composition with the Samsung
						BioActive sensor.
					</Typography>
					<Link to="/smartWatches" className="w-min">
						<Typography className="text-sm font-semibold px-8 py-2 mt-4 rounded-full bg-highlight flex gap-2 w-min items-center text-main hover:opacity-70">
							<span>Explore </span>
							<FaArrowRightFromBracket />
						</Typography>
					</Link>
				</div>
			</div>
			<Typography className="text-3xl lg:text-6xl font-bold font-serif text-center mb-8 mt-10">
				Accessories
			</Typography>
			<div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 mb-20 min-h-[260px]">
				<Link to="/chargers" className="w-full h-full">
					<div className="w-full h-full bg-main rounded-xl p-4 hover:scale-105 flex flex-col gap-4">
						<img
							className="w-full object-contain mx-auto flex-1"
							src={homeProductCharger}
							alt="home-product"
						></img>
						<Typography className="text-xl lg:text-3xl font-bold font-serif text-center">
							Charger
						</Typography>
					</div>
				</Link>
				<Link to="/cables" className="w-full h-full">
					<div className="w-full h-full bg-main rounded-xl p-4 hover:scale-105  flex flex-col gap-4">
						<img
							className="w-full object-contain mx-auto flex-1"
							src={homeProductCable}
							alt="home-product"
						></img>
						<Typography className="text-xl lg:text-3xl font-bold font-serif text-center">
							Cable
						</Typography>
					</div>
				</Link>
				<Link to="/headphones" className="w-full h-full">
					<div className="w-full h-full bg-main rounded-xl p-4 hover:scale-105  flex flex-col gap-4">
						<img
							className="w-full object-contain mx-auto flex-1"
							src={homeProductHeadphone}
							alt="home-product"
						></img>
						<Typography className="text-xl lg:text-3xl font-bold font-serif text-center">
							Headphone
						</Typography>
					</div>
				</Link>
				<Link to="/mouses" className="w-full h-full">
					<div className="w-full h-full bg-main rounded-xl p-4 hover:scale-105  flex flex-col gap-4">
						<img
							className="w-full object-contain mx-auto flex-1"
							src={homeProductMouse}
							alt="home-product"
						></img>
						<Typography className="text-xl lg:text-3xl font-bold font-serif text-center">
							Mouse
						</Typography>
					</div>
				</Link>
				<Link to="/keyboards" className="w-full h-full">
					<div className="w-full h-full bg-main rounded-xl p-4 hover:scale-105  flex flex-col gap-4">
						<img
							className="w-full object-contain mx-auto flex-1"
							src={homeProductKeyboard}
							alt="home-product"
						></img>
						<Typography className="text-xl lg:text-3xl font-bold font-serif text-center">
							Keyboard
						</Typography>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
