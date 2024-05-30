import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollTop(behavior = 'instant') {
	const location = useLocation();

	useEffect(() => {
		document.documentElement.scrollTo({
			top: 0,
			left: 0,
			behavior: behavior, // Optional if you want to skip the scrolling animation
		});
	}, [location, behavior]);

	return null;
}
