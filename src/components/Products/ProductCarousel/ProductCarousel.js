import { Carousel } from '@material-tailwind/react';

const ProductCarousel = ({ imgList }) => {
	return (
		<Carousel
			className="rounded-xl"
			autoplay={true}
			autoplayDelay={5000}
			loop={true}
			navigation={({ setActiveIndex, activeIndex, length }) => (
				<div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
					{new Array(length).fill('').map((_, i) => (
						<span
							key={i}
							className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
								activeIndex === i
									? 'w-8 bg-white'
									: 'w-4 bg-white/50'
							}`}
							onClick={() => setActiveIndex(i)}
						/>
					))}
				</div>
			)}
		>
			{imgList &&
				imgList.map((img) => {
					return (
						<img
							key={img}
							src={img}
							alt=""
							className="h-full w-full object-contain p-4"
						/>
					);
				})}
		</Carousel>
	);
};

export default ProductCarousel;
