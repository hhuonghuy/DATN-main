'use client';
import Product from '@/components/Product';
import { map } from 'lodash';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ProductListProps {
	title: string;
	productList: any;
	loading: any;
	error: any;
}

const SectionProducts: React.FC<ProductListProps> = ({ title, productList, loading, error }) => {
	const configSwiper = {
		slidesPerView: 2.2,
		spaceBetween: 12,
		freeMode: true,
		modules: [FreeMode],
		className: 'swiper-list',
		breakpoints: {
			500: {
				slidesPerView: 3.2,
				spaceBetween: 16,
			},
			768: {
				slidesPerView: 4.2,
				spaceBetween: 24,
			},
			992: {
				slidesPerView: 5.2,
				spaceBetween: 24,
			},
			1024: {
				slidesPerView: 5.9,
				spaceBetween: 32,
			},
		},
	};
	return (
		<section className="site-products">
			<h6 className="title _text-center _text-uppercase">{title}</h6>
			<Swiper {...configSwiper}>
				{error || loading ? (
					<div className="loading-skeleton-card">
						{Array.from({ length: 5 }).map((_, index) => (
							<div
								key={index}
								className="category-item-skeleton"
							>
								<div className="card-is-loading">
									<div className="image"></div>
									<div className="content">
										<h2></h2>
										<h2></h2>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					map(productList?.products?.slice(0, 12), (product) => (
						<SwiperSlide
							className="product-list"
							key={`product-item-${product._id}`}
						>
							<Product
								brand="Son's Premium"
								id={product._id}
								slug={product.slug}
								name={product.name}
								images={product.images}
								price={product.price}
								discount={product.discount}
							/>
						</SwiperSlide>
					))
				)}
			</Swiper>
		</section>
	);
};

export default SectionProducts;
