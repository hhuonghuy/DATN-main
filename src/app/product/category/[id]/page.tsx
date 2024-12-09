'use client';

import Product from '@/components/Product';
import SectionProducts from '@/components/SectionProducts';
import { slidesPerView, spaceBetween } from '@/containers/products/contains';
import { useDebounce } from '@/containers/products/hooks';
import { LoadingSkeletonCategory } from '@/containers/products/loading';
import { useCategoriesQuery } from '@/query/categories/getCategories';
import { useFilterProductsQuery, useProductsByCategoryQuery } from '@/query/products/getDataProducts';
import { Category } from '@/utils/type';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { BsFilterLeft, BsSearch } from 'react-icons/bs';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const PageProductsByCategory = () => {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();

	const defaultPageSize = 9;
	const initialPage = parseInt(searchParams.get('page') || '1', 10);
	const initialPageSize = parseInt(searchParams.get('pageSize') || `${defaultPageSize}`, 10);
	const initialName = searchParams.get('name') || '';

	const [name, setName] = useState<string>(initialName);
	const [currentPage, setCurrentPage] = useState<number>(initialPage);
	const [pageSize, setPageSize] = useState<number>(initialPageSize);

	const id = params.id;
	const debouncedName = useDebounce(name, 1000);

	const { data: categoriesData, isLoading: loadingCategories, error: errorCategories } = useCategoriesQuery();
	const {
		data: DATA_PRODUCT_BY_CATEGORY,
		isLoading: LOADING_PRODUCTS_BY_CATEGORY,
		error: ERROR_PRODUCTS_BY_CATEGORY,
		refetch: REFETCH_DATA_PRODUCTS_BY_CATEGORY,
	} = useProductsByCategoryQuery(id, currentPage, pageSize);

	const {
		data: DATA_PRODUCT_FILTER,
		isLoading: LOADING_PRODUCT_FILTER,
		error: ERROR_PRODUCT_FILTER,
	} = useFilterProductsQuery(debouncedName);

	useEffect(() => {
		if (id) {
			REFETCH_DATA_PRODUCTS_BY_CATEGORY();
		}
	}, [id, currentPage, pageSize, REFETCH_DATA_PRODUCTS_BY_CATEGORY]);

	const handleCategoryClick = (categoryId: string) => {
		setCurrentPage(1);
		router.push(`/product/category/${categoryId}?page=1&pageSize=${pageSize}`);
	};

	const handleProductPageChange = (page: number) => {
		setCurrentPage(page);
		router.push(`/product/category/${id}?page=${page}&pageSize=${pageSize}`);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	useEffect(() => {
		const newPath = debouncedName ? `/product` : `/product/category/${id}`;
		const newQuery = new URLSearchParams(searchParams);
		if (debouncedName) {
			newQuery.set('name', debouncedName);
		} else {
			newQuery.delete('name');
		}
		router.push(`${newPath}?${newQuery.toString()}`);
	}, [debouncedName, id, router, searchParams]);

	const totalPages = Math.ceil((DATA_PRODUCT_BY_CATEGORY?.totalProducts || 0) / pageSize);
	const currentProducts = DATA_PRODUCT_BY_CATEGORY?.products || DATA_PRODUCT_FILTER;

	return (
		<Fragment>
			<main className="site-products-page container">
				<section className="site-categories">
					{!errorCategories && (
						<>
							<div className="categories-list">
								{loadingCategories || !categoriesData || errorCategories ? (
									<LoadingSkeletonCategory />
								) : (
									<Swiper
										slidesPerView={slidesPerView.base}
										spaceBetween={spaceBetween.base}
										scrollbar={{ hide: false }}
										breakpoints={{
											768: {
												slidesPerView: slidesPerView.tablet,
												spaceBetween: spaceBetween.tablet,
											},
											1024: {
												slidesPerView: slidesPerView.desktop,
												spaceBetween: spaceBetween.desktop,
											},
										}}
										modules={[Scrollbar]}
										className="swiper-categories"
									>
										{categoriesData.map((category: Category) => (
											<SwiperSlide key={category._id}>
												<div
													className="category-item"
													onClick={() => handleCategoryClick(category._id)}
												>
													<Link
														href={`/product/category/${category._id}`}
														as={`/product/category/${category._id}`}
														className="image"
													>
														<Image
															alt="category-item"
															width={500}
															height={500}
															loading="lazy"
															src={category.image}
														/>
													</Link>
													<div>
														<p className="category-link">{category.name}</p>
													</div>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								)}
							</div>
						</>
					)}
				</section>

				<section className="main-section-products">
					<div className="filter-wrapper">
						<div className="filters-inner">
							<div className="filter">
								<BsFilterLeft size={22} />
								Filter
							</div>
							<div className="filter">
								<label htmlFor="filter-select-products">Sort by</label>
								<select
									name="filter-select-products"
									id="filter-select-products"
									className="filter-select-products"
								>
									<option value="recommended">Recommended</option>
									<option value="Price-Low-Hight">Price Low-High</option>
									<option value="Price-High-Low">Price High-Low</option>
								</select>
							</div>
						</div>
						<p className="total-products">{DATA_PRODUCT_BY_CATEGORY?.totalProducts} items</p>
					</div>

					<div className="products-wrapper">
						<aside className="sidebar-wrapper">
							<div className="sidebar-inner">
								{/* Search Input */}
								<div className="search-wrapper">
									<input
										type="text"
										placeholder="Search products..."
										onChange={handleSearchChange}
										defaultValue={initialName}
									/>
									<BsSearch />
								</div>
								<div className="sidebar-type">
									{/* Render categories in the sidebar */}
									{loadingCategories || !categoriesData || errorCategories ? (
										<div>Loading...</div>
									) : (
										<div className="categories-list">
											{categoriesData.map((category: Category) => (
												<div
													className="category-item"
													key={category._id}
												>
													<Link
														className="link-color"
														href={`/product/category/${category._id}`}
													>
														{category.name}
													</Link>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						</aside>
						<section className="wrapper-product-list">
							{LOADING_PRODUCTS_BY_CATEGORY ? (
								<div className="loading-skeleton-product">
									{Array.from({ length: pageSize }).map((_, index) => (
										<div
											className="card-is-loading"
											key={index}
										>
											<div className="image"></div>
											<div className="content">
												<h2></h2>
												<h2></h2>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="main-products-list">
									{currentProducts.map((product: any) => (
										<Product
											slug={product.slug}
											key={product._id}
											id={product._id}
											name={product.name}
											images={product.images}
											price={product.price}
											discount={product.discount}
											brand="Son's Premium"
											sale="30% off $125+ Applied at Checkout"
											button="Quick Add"
										/>
									))}
								</div>
							)}

							<div className="pagination-wrapper">
								<button
									type="button"
									className="button"
									onClick={() => handleProductPageChange(currentPage - 1)}
									disabled={currentPage === 1}
								>
									<GrFormPrevious size={20} /> <p className="label">Prev</p>
								</button>

								<div className="pagination-list">
									{Array.from({ length: totalPages }).map((_, index) => {
										const pageNumber = index + 1;
										return (
											<button
												key={pageNumber}
												onClick={() => handleProductPageChange(pageNumber)}
												className={`item ${pageNumber === currentPage ? '-active' : ''}`}
											>
												{pageNumber}
											</button>
										);
									})}
								</div>

								<button
									type="button"
									className="button"
									onClick={() => handleProductPageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
								>
									<p className="label">Next</p> <GrFormNext size={20} />
								</button>
							</div>
						</section>
					</div>
				</section>
			</main>

			<SectionProducts
				title="BESTSELLERS WE RECOMMEND"
				productList={DATA_PRODUCT_BY_CATEGORY}
				loading={LOADING_PRODUCTS_BY_CATEGORY}
				error={ERROR_PRODUCTS_BY_CATEGORY}
			/>
		</Fragment>
	);
};

export default PageProductsByCategory;
