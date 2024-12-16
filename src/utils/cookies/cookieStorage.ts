import cookie from 'js-cookie';

const ACCESS_TOKEN = 'accessToken';

const getAccessToken = () => {
	// Retrieve token from cookie
	const tokenString = cookie.get(ACCESS_TOKEN);

	// If token does not exist or is empty, return null
	if (!tokenString || tokenString === '') {
		return null;
	}

	try {
		// Parse token from JSON format
		const token = JSON.parse(tokenString);
		return token; // Return parsed token
	} catch (error) {
		// Log error if parsing fails and return null
		console.error('Error parsing access token:', error);
		return null;
	}
};

const setAccessToken = (token: string) => {
	// Convert token to string
	const accessToken = JSON.stringify(token);

	// Set expiration date for token cookie (24 hours from now)
	const expireDate = new Date();
	expireDate.setHours(expireDate.getHours() + 24);

	// Set token in cookie with expiration date
	cookie.set(ACCESS_TOKEN, accessToken, {
		expires: expireDate,
	});
};

const clearToken = () => {
	// Remove token cookie from browser
	cookie.remove(ACCESS_TOKEN);
};

const isValidAccessToken = () => {
	// Check if there is a valid access token in cookie
	const token = cookie.get(ACCESS_TOKEN);
	return !!token; // Return true if token exists, false otherwise
};

export { clearToken, getAccessToken, isValidAccessToken, setAccessToken };
