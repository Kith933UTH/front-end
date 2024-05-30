import React from 'react';

const ProductSpecificationsSkeleton = () => {
	return (
		<div className="w-full border-gray-700 border-solid border-[1px] rounded-xl overflow-hidden">
			<div className="w-full h-10 animate-pulse bg-main"></div>
			<div className="w-full h-10 animate-pulse bg-transparent"></div>
			<div className="w-full h-10 animate-pulse bg-main"></div>
			<div className="w-full h-10 animate-pulse bg-transparent"></div>
			<div className="w-full h-10 animate-pulse bg-main"></div>
			<div className="w-full h-10 animate-pulse bg-transparent"></div>
			<div className="w-full h-10 animate-pulse bg-main"></div>
			<div className="w-full h-10 animate-pulse bg-transparent"></div>
			<div className="w-full h-10 animate-pulse bg-main"></div>
		</div>
	);
};

export default ProductSpecificationsSkeleton;
