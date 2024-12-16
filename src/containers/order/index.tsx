'use client';

import { selectCartItems } from '@/redux/cart/selectors';
import { useAppSelector } from '@/redux/hook';
import { map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import OrderFormInformation from './OrderFormInformation';

export default function PageOrder() {
	// Get list of items from Redux
	const itemBagCart = useAppSelector(selectCartItems);
	// Function to calculate total price

	const calculateTotalPrice = () => {
		let totalPrice = 0;
		itemBagCart.forEach((item: any) => {
			totalPrice += item.discountPrice * item.quantity;
		});
		return totalPrice.toFixed(2);
	};
	const totalPrice = calculateTotalPrice();

	return (
		<main className="site-order-page">
			<section className="order container">
				<div className="wrapper">
					<OrderFormInformation
						itemBagCart={itemBagCart}
						total={totalPrice}
					/>
					<div className="order-payment-wrapper">
						<h3 className="title">ORDER SUMMARY</h3>
						<div className="item">
							<p>Items</p>
							<p>{itemBagCart.length}</p>
						</div>
						<div className="item">
							<p>Estimated Tax</p>
							<p>Calculated in Checkout</p>
						</div>
						<div className="item">
							<p>Shipping</p>
							<p>Free</p>
						</div>
						<div className="total">
							<p>Total</p>
							<p>${totalPrice}</p>
						</div>
						{/* item cart order */}
						<div className="order-list-cart-wrapper">
							<h6 className="title">Shopping Bag</h6>
							<p className="number">{itemBagCart.length || '0'} item</p>
							<div className="list-item-order-box">
								{map(itemBagCart, (item) => (
									<div className="item">
										<Link
											href={`/product/${item?.slug}`}
											className="image"
										>
											<Image
												width={500}
												height={500}
												loading="lazy"
												src={item.images[0]}
												alt={`product cart item-${item.id}`}
											/>
										</Link>
										<div className="desc">
											<p className="name">{item.name}</p>
											<p className="price">{item.discountPrice.toFixed(2)}$</p>
											<div className="size">
												{item.size} <p>Quantity:{item.quantity}</p>
											</div>
											<p className="total">
												Total: <p>${(item.quantity * item.discountPrice).toFixed(2)}</p>
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
