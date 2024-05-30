import { useState, React } from 'react';
import {
	Typography,
	List,
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@material-tailwind/react';
import { GrContact } from 'react-icons/gr';
import { MdLocalPhone } from 'react-icons/md';

function Icon({ id, open }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			className={`${
				id === open ? 'rotate-180' : ''
			} h-5 w-5 transition-transform`}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19.5 8.25l-7.5 7.5-7.5-7.5"
			/>
		</svg>
	);
}
function Display(val) {
	const [open, setOpen] = useState(0);
	const handleOpen = (value) => setOpen(open === value ? 0 : value);
	return (
		<>
			{val.question.map((q, index) => {
				return (
					<Accordion
						key={q.h}
						open={open === q.h}
						icon={<Icon id={q.h} open={open} />}
					>
						<AccordionHeader
							onClick={() => handleOpen(q.h)}
							className={`text-text font-normal text-lg hover:text-text ${
								open === q.h
									? 'text-highlight hover:text-highlight '
									: ''
							} ${
								open !== q.h &&
								index === val.question.length - 1
									? 'border-none'
									: ''
							}`}
						>
							{q.h}
						</AccordionHeader>
						{val.desc.map((d) =>
							q.key === d.key ? (
								<AccordionBody
									key={d.h}
									className="text-text text-base"
								>
									{d.h}
								</AccordionBody>
							) : (
								''
							)
						)}
					</Accordion>
				);
			})}
		</>
	);
}
const data = [
	{
		label: 'Returns & Cancellations',
		value: 'returns',
		question: [
			{
				h: 'How do I cancel?',
				key: 1,
			},
			{
				h: 'How do I return?',
				key: 2,
			},
			{
				h: 'When will I receive my refund?',
				key: 3,
			},
		],
		desc: [
			{
				h: `Products that have already shipped or started the
		 manufacturing process cannot be cancelled.All cancellation 
		 requests will be reviewed to determine eligibility.Software 
		 delivered electronically cannot be cancelled at any point.	
		 After submitting a cancellation request, you will be notified via e-mail 
		 if the order was cancelled successfully or if we are 
		unable to fulfill your request.`,
				key: 1,
			},
			{
				h: `Once processed, you will receive an email within 48 hours containing your RMA (Return Authorization Number), return shipping label and next steps.
		Repackage the item(s) in the original box, including all accessories and packaging.
		Apply the return shipping label to the box; please do not cover the battery warning label sticker (if applicable).
		Bring your package to any UPS location.`,
				key: 2,
			},
			{
				h: `Please allow 5-10 business days for our to receive your package, inspect the returned merchandise and issue your refund to your original form of payment. Please allow 2-10 business days (depending on your bank and form of payment) to receive your refund.`,
				key: 3,
			},
		],
	},
	{
		label: 'Shipping & Delivery',
		value: 'ship',
		question: [
			{
				h: 'Shipping & Ship Date Expectations',
				key: 1,
			},
			{
				h: 'Expedited Shipping through Account Rewards',
				key: 2,
			},
			{
				h: 'Electronically Delivered or Pre-installed Products',
				key: 3,
			},
		],
		desc: [
			{
				h: `We ship via UPS. Expedited delivery is for shipping, not order processing
				UPS should deliver expedited orders within 1-4 days after shipment.
				Expedited delivery will not affect order processing or manufacturing time that may be applicable to your order.`,
				key: 1,
			},
			{
				h: `Expedited delivery is for shipping, not order processing
				UPS should deliver expedited orders within 1-4 days after shipment.
				Expedited delivery will not affect order processing or manufacturing time that may be applicable to your order.`,
				key: 2,
			},
			{
				h: `Certain products cannot be physically shipped and will either be 
				delivered electronically in a separate fulfillment email or come pre-installed 
				in your system. Please access your Order Details page, which can be accessed through 
				your Account or the link in your order confirmation email to view the latest 
				status information and manage these items.`,
				key: 3,
			},
		],
	},
	{
		label: 'Payments & Price Protection',
		value: 'pay',
		question: [
			{
				h: 'What payment methods can I use?',
				key: 1,
			},
			{
				h: 'Special programs',
				key: 2,
			},
			{
				h: 'Tax Exemption',
				key: 3,
			},
		],
		desc: [
			{
				h: `We accept major credit cards, wires, check draft, Amazon Pay, Google Pay and Pay Pal.
			Financing is available.
			For wire and check payments or financing orders, we may defer shipment until funds are received or approved.
			Please contact Sales if your preferred payment method is unavailable.`,
				key: 1,
			},
			{
				h: `We're proud to offer discounts off regular prices to our First Responders, medical professionals , educators and our military families as thank you for everything you do.

			We also offer discounts to K-12 and college students and seniors.`,
				key: 2,
			},
			{
				h: `We highly recommend qualified customers request tax exemption prior to placing an order.
			If you qualify for a tax exemption but have already placed an order on website, 
			please contact us for reimbursement of the tax amount. The reimbursement of the tax 
			amount back to your original form of payment could take up to 90 days.
			Our sales taxes applied at checkout may vary depending on several factors, 
			such as the item(s)purchased, shipping location, and tax-exempt cases.`,
				key: 3,
			},
		],
	},
];

const ContactPage = () => {
	const [activeTab, setActiveTab] = useState('returns');

	const information = [
		{
			kind: 'Chat Support',
			hours: 'Hours',
			icon: <GrContact />,
			timeNormalDay: '8 AM - 9 PM EST',
			timeWeekend: '11 AM - 8 PM EST',
			communication: 'Email: techshop121212@gmail.com',
			kindB: 'Shopping for a business?',
			hoursB: 'Techshop Pro for Business Hours:',
			timeNormalDayB: '8 AM - 6 PM EST',
			timeWeekendB: 'Closed',
			communicationB: 'techshop121212@gmail.com',
		},
		{
			kind: 'Phone Support',
			hours: 'Hours',
			icon: <MdLocalPhone />,
			timeNormalDay: '8 AM - 9 PM EST',
			timeWeekend: '11 AM - 8 PM EST',
			communication: 'Phone: 0987654321',
			kindB: 'Shopping for a business?',
			hoursB: 'Techshop Pro for Business Hours:',
			timeNormalDayB: '8 AM - 7 PM EST',
			timeWeekendB: 'Closed',
			communicationB: 'Phone: 0123456789',
		},
	];

	return (
		<>
			<div className=" h-full rounded-2xl max-w-[1200px] desktop:p-0 desktop:m-0 desktop:mb-2">
				<div className="w-full mx-auto">
					<Typography className="justify-center items-center pt-6 flex pb-3 text-3xl font-semibold">
						Contact Us
					</Typography>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center h-full w-full ">
						{information.map((data) => (
							<List
								key={data.kind}
								className="text-text p-0 h-full"
							>
								<div className="h-full desktop:w-full tablet:w-full p-8 mx-auto flex-col items-center justify-center my-6 rounded-xl border-text border border-solid">
									<Typography className="mx-auto flex justify-center items-center text-xl w-14 h-14 border border-solid rounded-full">
										{data.icon}
									</Typography>
									<Typography className="justify-center items-center pt-4 flex font-semibold text-2xl text-center">
										{data.kind}
									</Typography>
									<hr className="my-4 border-blue-gray-50" />
									<Typography className="justify-center items-center flex text-lg">
										Mon-Fri: {data.timeNormalDay}
									</Typography>
									<Typography className="justify-center items-center pt-4 flex text-lg">
										Sat-Sun: {data.timeWeekend}
									</Typography>
									<Typography className="justify-center items-center pt-4 flex text-lg text-center">
										{data.communication}
									</Typography>
									<Typography className="justify-center items-center pt-16 flex font-semibold text-2xl text-center">
										{data.kindB}
									</Typography>
									<hr className="my-4 border-blue-gray-50" />
									<Typography className="justify-center items-center flex text-lg text-center">
										{data.hoursB}
									</Typography>
									<Typography className="justify-center items-center pt-4 flex text-lg">
										Mon-Fri: {data.timeNormalDayB}
									</Typography>
									<Typography className="justify-center items-center pt-4 flex text-lg">
										Sat-Sun: {data.timeWeekendB}
									</Typography>
									<Typography className="justify-center items-center pt-4 flex text-lg">
										{data.communicationB}
									</Typography>
								</div>
							</List>
						))}
					</div>
					<Typography className="justify-center items-center pt-12 flex pb-6 mb-4 text-3xl font-semibold">
						Frequently Asked Questions
					</Typography>
					<div className="pb-8">
						<Tabs
							value={activeTab}
							className="border-text border border-solid rounded-xl px-4"
						>
							<TabsHeader
								className="rounded-none border-b border-text bg-transparent p-0 flex-col md:flex-row"
								indicatorProps={{
									className:
										'bg-transparent border-b-2 border-text shadow-none rounded-none border-solid',
								}}
							>
								{data.map(({ label, value }) => (
									<Tab
										key={value}
										value={value}
										onClick={() => setActiveTab(value)}
										className={`text-lg py-4 font-semibold ${
											activeTab === value
												? 'text-highlight'
												: 'text-text'
										} `}
									>
										{label}
									</Tab>
								))}
							</TabsHeader>
							<TabsBody>
								{data.map((item) => (
									<TabPanel
										key={item.value}
										value={item.value}
										className="text-text pt-0"
									>
										{/* {item.label} */}
										{Display(item)}
									</TabPanel>
								))}
							</TabsBody>
						</Tabs>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactPage;
