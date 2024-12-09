'use client';
// base
import { useRouter } from 'next/navigation';
// redux
import { selectCartItems } from '@/redux/cart/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { openModalLogin } from '@/redux/modal/slice';
// components
import CartProductList from './CartProductList';
// routes
import { ROUTER } from '@/utils/routes/routes';
// cookies
import { isValidAccessToken } from '@/utils/cookies/cookieStorage';
// constants
import SectionProducts from '@/components/SectionProducts';
import { useProductsQuery } from '@/query/products/getDataProducts';

export default function PageCart() {
	// get data use react-query
	const { data: DATA_PRODUCTS, isLoading: LOADING_PRODUCT, error: ERROR_PRODUCT } = useProductsQuery(1, 10);
	// Get list of items from Redux
	const itemBagCart = useAppSelector(selectCartItems);
	const dispatch = useAppDispatch();
	const router = useRouter();
	// Function to calculate total price
	const calculateTotalPrice = () => {
		const totalPrice = itemBagCart.reduce(
			(total: number, item: { discountPrice: number; quantity: number }) =>
				total + item.discountPrice * item.quantity,
			0,
		);
		return totalPrice.toFixed(2);
	};

	const handleIsValidToken = () => {
		const isValidToken = isValidAccessToken();
		if (isValidToken && itemBagCart.length > 0) {
			return router.push(`${ROUTER.ORDER}`);
		} else {
			dispatch(openModalLogin());
		}
	};

	return (
		<main className="main-page-cart">
			<section className="page-cart-wrapper container">
				<div className="shopping-cart-inner">
					{/* notification */}
					<div className="shopping-cart-notify">
						<div className="title">
							Red Tab™ Members get 20% off your first order + free shipping and returns.
							<span className="sub"> Free to join. </span>
						</div>
						<div className="actions">
							<button
								type="button"
								className="action"
							>
								Join Now
							</button>
							or
							<button
								type="button"
								className="action"
							>
								Log In
							</button>
						</div>
					</div>
					<CartProductList />
				</div>
				{/* payment */}
				<div className="payment-cart-inner">
					<h4 className="title _text-uppercase">payment summary</h4>
					<div className="promo-box">
						<h5 className="sub-title">Promotions</h5>
						<p className="content">Promo Details</p>
					</div>
					<div className="promo-phase">
						<h5 className="sub-title">Items</h5>
						<p className="content">${calculateTotalPrice()}</p>
					</div>
					<div className="promo-phase">
						<h5 className="sub-title">Shipping</h5>
						<p className="content">Free</p>
					</div>
					<div className="promo-phase">
						<h5 className="sub-title">Estimated Tax</h5>
						<p className="content">Calculated in Checkout</p>
					</div>

					<div className="total-box">
						<h5 className="sub-title">Total</h5>
						<p className="content">${calculateTotalPrice()}</p>
					</div>
					<button
						className="button-checkout"
						type="button"
						onClick={handleIsValidToken}
					>
						Checkout
					</button>
				</div>
			</section>
			{/* login favorite */}
			<section className="cart-favorite container">
				<h4 className="title">YOUR FAVORITES</h4>
				<div className="actions">
					Log In or Sign Up to view your favorite items
					<div className="link">
						<button type="button">Log In</button>
						<button type="button">Sign up</button>
					</div>
				</div>
			</section>
			{/* product flex*/}
			<SectionProducts
				title="CUSTOMERS ALSO BOUGHT"
				productList={DATA_PRODUCTS}
				loading={LOADING_PRODUCT}
				error={ERROR_PRODUCT}
			/>
		</main>
	);
}
