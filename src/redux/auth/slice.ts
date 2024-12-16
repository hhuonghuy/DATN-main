import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '..';
import { closeModalLogin } from '../modal/slice';
// utils cookies
import { clearToken, setAccessToken } from '@/utils/cookies/cookieStorage';
// firebase
import { auth } from '@/configs/FireBase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

interface AuthState {
	user: any | null;
	loading: boolean;
	error: string | null;
}
// Function to load user from local storage
const loadUserFromLocalStorage = (): any | null => {
	if (typeof window === 'undefined') {
		return null;
	}

	const storedUser = localStorage.getItem('user');
	return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: AuthState = {
	user: loadUserFromLocalStorage(),
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// Login Email Firebase
		loginEmailStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginEmailSuccess: (state, action: PayloadAction<any>) => {
			state.loading = false;
			state.user = action.payload;
			localStorage.setItem('user', JSON.stringify(action.payload));
			const accessToken = action?.payload?.stsTokenManager?.accessToken || action?.payload?.data?.token;
			setAccessToken(accessToken);
		},
		loginEmailFailure: (state, action: PayloadAction<any>) => {
			state.loading = false;
			state.error = action.payload;
		},
		logoutSuccess: (state) => {
			state.loading = false;
			state.user = null;
			localStorage.removeItem('user');
			clearToken();
		},
	},
});

// handle login firebase

export const loginWithGoogle = (): AppThunk => async (dispatch) => {
	try {
		dispatch(loginEmailStart());
		const provider = new GoogleAuthProvider();
		const userCredential = await signInWithPopup(auth, provider);
		await dispatch(loginEmailSuccess(userCredential.user));
		dispatch(closeModalLogin());
	} catch (error) {
		dispatch(loginEmailFailure(error));
	}
};

export const logoutGoogle = (): AppThunk => async (dispatch) => {
	try {
		await signOut(auth);
		dispatch(logoutSuccess());
	} catch (error) {
		console.log('error', error);
	}
};

export const { loginEmailStart, loginEmailSuccess, loginEmailFailure, logoutSuccess } = authSlice.actions;

export default authSlice;
