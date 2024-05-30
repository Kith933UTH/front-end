import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StartOutline } from '@heroicons/react/24/outline';
import React from 'react';

const RatingBar = ({ value, relatedStyle, unrelatedStyle, wrapperStyle }) => {
	const arr = [1, 2, 3, 4, 5].map((item, key) => {
		if (item <= value) {
			return <StarIcon key={key} className={relatedStyle} />;
		} else {
			return <StartOutline key={key} className={unrelatedStyle} />;
		}
	});
	return <div className={wrapperStyle}>{arr}</div>;
};

export default RatingBar;
