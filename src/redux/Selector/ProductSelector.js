import { createSelector } from '@reduxjs/toolkit';

export const productSelector = (state) => state.products;
export const productFilterSelector = (state) => state.products.filters;
// export const searchKeySelector = (state) => state.products.searchKey;

// export const searchProductSelector = createSelector(
// 	productSelector,
// 	searchKeySelector,
// 	(productsData, searchKey) => {
// 		return {
// 			...productsData,
// 			data: productsData.data.filter((product) =>
// 				product.name.includes(searchKey)
// 			),
// 		};
// 	}
// );

export const remainProductListSelector = createSelector(
	productSelector,
	productFilterSelector,
	(productsData, filtersList) => {
		const chooseRate = filtersList.rate
			.filter((rate) => rate.choose)
			.map((rate) => rate.value);
		return {
			...productsData,
			data: productsData.data
				.filter((product) => {
					return (
						chooseRate.length === 0 ||
						chooseRate.includes(
							Math.floor(
								product.ratingStarStatistics.averageRating
							)
						)
					);
				})
				.sort((a, b) =>
					filtersList.price
						.find((price) => price.choose)
						.callback(
							a.variants[0].price *
								(100 -
									a.variants[0].discount.discountPercentage),
							b.variants[0].price *
								(100 -
									b.variants[0].discount.discountPercentage)
						)
				),
		};
	}
);
