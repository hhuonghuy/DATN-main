export const LoadingSkeletonCategory = () => {
	return (
		<div className="loading-skeleton-category">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					className="category-item-skeleton"
				>
					<div className="card-is-loading">
						<div className="image"></div>
						<div className="content">
							<h2></h2>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export const LoadingSkeletonProduct = () => {
	return (
		<div className="loading-skeleton-product">
			{Array.from({ length: 9 }).map((_, index) => (
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
	);
};
