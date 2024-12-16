import { ROUTER } from '@/utils/routes/routes';
import { Product } from '@/utils/type';
import Image from 'next/image';
import Link from 'next/link';

const ProductSale = ({ images, name, size, price, id }: Product) => {
	const imageSrc = images && images.length > 0 ? images[0] : '/default-image.jpg';
	return (
		<div
			className="product-sale-item"
			key={id}
		>
			<Link
				href={`${ROUTER.PRODUCT_DETAIL}/${id}`} // ROUTER.PRODUCT_DETAIL}
				className="image"
			>
				<Image
					width={500}
					height={500}
					src={imageSrc}
					alt="Product sale"
				/>
			</Link>
			<div className="desc">
				<Link
					href={`${ROUTER.PRODUCT_DETAIL}/${id}`} // ROUTER.PRODUCT_DETAIL}
					className="name"
				>
					{name}
				</Link>
				<div className="item-size">30W X 30L</div>
				<p className="price">${price}</p>
				<p className="size">{size}</p>
			</div>
		</div>
	);
};

export default ProductSale;
