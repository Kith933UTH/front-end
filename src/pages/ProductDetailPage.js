import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/Products/ProductDetail';

const ProductDetailPage = ({ cateName, catePath }) => {
	const { productId } = useParams();
	return (
		<ProductDetail id={productId} cateName={cateName} catePath={catePath} />
	);
};

export default ProductDetailPage;
