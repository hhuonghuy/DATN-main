const SkeletonPageProductDetail = () => {
	return (
		<main className="site-detail">
			<section className="detail container">
				{/* slide Image product */}
				<div className="detail-slide skeleton-loading">{/* Skeleton for swiper thumbnails */}</div>
				{/* end of thumbnails */}
				<div className="detail-info skeleton-loading">{/* Skeleton for product information */}</div>
			</section>
			{/* section product */}
			<div className="section-products skeleton-loading">{/* Skeleton for section products */}</div>
			<div className="section-products skeleton-loading">{/* Skeleton for section products */}</div>
			{/* comment */}
			<div className="comment skeleton-loading">{/* Skeleton for comments */}</div>
		</main>
	);
};

export default SkeletonPageProductDetail;
