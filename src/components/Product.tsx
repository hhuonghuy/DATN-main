import { ROUTER } from '@/utils/routes/routes';
import Image from 'next/image';
import Link from 'next/link';

interface IProductProps {
	id?: string;
	images: string | string[];
	name: string;
	price: number;
	discount?: number;
	sale?: string;
	brand?: string;
	button?: string;
	slug?: string;
}

const Product = ({ id, images, name, price, discount, sale, button, brand, slug }: IProductProps) => {
	// Convert images to an array if it's a string
	const imageArray = typeof images === 'string' ? [images] : images;

	// When the figure has a quantity greater than 2, take the first element
	const imageUrl =
		imageArray && imageArray.length > 0
			? imageArray[0]
			: 'https://img2.thuthuatphanmem.vn/uploads/2018/11/30/hinh-nen-trang-ban-do-the-gioi_104325245.jpg';

	// Calculate discounted price
	const discountedPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price?.toFixed(2);

	return (
		<div
			className="product"
			key={id}
		>
			<Link
				href={`/${ROUTER.PRODUCT_DETAIL}/${[slug]}`}
				as={`/${ROUTER.PRODUCT_DETAIL}/${slug}`}
				className="image"
			>
				<Image
					className="image-item"
					width={500}
					height={500}
					src={imageUrl}
					alt="image-item"
					loading="lazy"
				/>
				<button
					type="button"
					className="btn"
				>
					{button}
				</button>
			</Link>
			<div className="desc">
				<p className="brand _text-capitalize">{brand}</p>
				<Link
					href={`${ROUTER.PRODUCT_DETAIL}/${id}`}
					className="name"
				>
					{name}
				</Link>
				<p className="new-price">
					${discountedPrice} <del className="old-price">${price}</del>
				</p>
				<p className="sale">{sale}</p>
			</div>
		</div>
	);
};

export default Product;
