export const saveCartToLocalStorage = (cartItems: any) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}
};

export const getCartFromLocalStorage = () => {
	if (typeof window !== 'undefined') {
		const cartItemsJSON = localStorage.getItem('cartItems');
		return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
	}
	return [];
};

export const clearCartFromLocalStorage = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('cartItems');
	}
};
