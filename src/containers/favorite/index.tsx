'use client';

import ButtonLink from '@/compound/demo-button/button-link/ButtonLink';
import ModalNotification from '@/modals/notification/Notification';
import { useDeleteFavorite, useGetFavoriteByUser } from '@/query/favorite/handleApiFavorite';
import { selectInformationUserLoginEmail } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hook';
import { ROUTER } from '@/utils/routes/routes';
import { map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaHeart, GrFormClose } from '../../compound/icons/index';
import { MENU_FAVORITE } from './constants';

const PageFavorite = () => {
	const inforUser = useAppSelector(selectInformationUserLoginEmail);
	const userId = inforUser?._id || null;
	const {
		data: DATA_FAVORITE_BY_USER,
		isLoading: LOADING_PRODUCT_FAVORITE_BY_USER,
		error: ERROR_PRODUCT_FAVORITE_BY_USER,
		refetch: REFETCH_DATA_FAVORITE_BY_USER,
	} = useGetFavoriteByUser(userId as string);

	const [modalVisible, setModalVisible] = useState(true);
	const [modalMessage, setModalMessage] = useState('');

	// xóa sản phẩm yêu thích
	const { mutate: DELETE_FAVORITE_BY_USER_MUTATION, isLoading: DELETE_FAVORITE_BY_USER_LOADING } =
		useDeleteFavorite(userId);

	const deleteFavorite = async (productId: string) => {
		// Optimistically update the UI

		DELETE_FAVORITE_BY_USER_MUTATION(productId, {
			onSuccess: () => {
				REFETCH_DATA_FAVORITE_BY_USER();
				setModalMessage('Item successfully deleted.');
				setModalVisible(true);
			},
			onError: () => {
				// Revert to original data if the deletion fails
				setModalMessage('Failed to delete item. Please try again.');
				setModalVisible(true);
			},
		});
	};

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | undefined;
		if (modalVisible) {
			timer = setTimeout(() => {
				setModalVisible(false);
			}, 3000); // Close modal after 2 seconds
		}
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [modalVisible]);

	return (
		<main className="site-products-pag container">
			{/* Modal Notification */}
			<ModalNotification
				stateModalVisible={modalVisible}
				message={modalMessage}
				onClose={() => setModalVisible(false)}
			/>
			{/* navigation favorite */}
			<div className="favorite-account">
				<ul className="account-navigation">
					{map(MENU_FAVORITE, ({ label, route }) => (
						<li
							key={label}
							className="nav-list-item"
						>
							<Link
								href={route}
								className="link"
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
				{/* favorite products list */}
				<div className="favorites-list-wrapper">
					<div className="favorite-title">
						<div className="text">FAVORITES</div>
						<p className="value">{DATA_FAVORITE_BY_USER?.length} items</p>
					</div>
					{LOADING_PRODUCT_FAVORITE_BY_USER || DELETE_FAVORITE_BY_USER_LOADING ? (
						<div className="site-loading">
							<div className="chaotic-orbit"></div>
						</div>
					) : (
						<div className="favorite-product-list">
							{/* render product favorite by user here */}
							{DATA_FAVORITE_BY_USER.length === 0 && (
								<div className="empty">
									<p>There are no items in your favorites.</p>
									<div>
										<ButtonLink color="three">Shop Men</ButtonLink>
										<ButtonLink color="three">Shop Women</ButtonLink>
									</div>
								</div>
							)}
							{map(DATA_FAVORITE_BY_USER && DATA_FAVORITE_BY_USER, (item) =>
								item.productId ? (
									<div
										className="favorite-item"
										key={item.productId._id}
									>
										<div className="product-image">
											<div className="slide-ratio">
												<Link
													className="cell-image-link"
													href={`${ROUTER.PRODUCT_DETAIL}/${item.productId?.slug}`}
												>
													<Image
														src={item?.productId?.images[0]}
														alt="image-product"
														width={600}
														height={500}
													/>
												</Link>
												<button
													type="button"
													className="favorite-button"
													// handle delete favorite by user
													onClick={() => deleteFavorite(item.productId._id)}
												>
													<FaHeart className="icon" />
												</button>
											</div>
										</div>
										<div className="product-info">
											<Link
												href={`${ROUTER.PRODUCT_DETAIL}/${item.productId?.slug}`}
												className="item-name"
											>
												{item.productId.name}{' '}
												<GrFormClose
													className="icon"
													// handle delete favorite by user
													onClick={() => deleteFavorite(item.productId._id)}
												/>
											</Link>
											<div className="item-color">Pictorial - Light Wash - Stretch</div>
											<div className="item-size">30W X 30L</div>
											<div className="item-price">${item.productId.price}</div>
											<div className="promo-badge">Buy 2+, Get 30% Off: Applied at Checkout</div>
										</div>
									</div>
								) : null,
							)}
							{/* render product favorite by user here */}
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default PageFavorite;
