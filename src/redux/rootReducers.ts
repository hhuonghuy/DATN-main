import { combineReducers } from '@reduxjs/toolkit'; // Import combineReducers from @reduxjs/toolkit
import authSlice from './auth/slice';
import cartSlice from './cart/slice';
import modalSlice from './modal/slice';

// Combine reducers from different slices into a single root reducer
const rootReducer = combineReducers({
	[cartSlice.name]: cartSlice.reducer,
	[modalSlice.name]: modalSlice.reducer,
	[authSlice.name]: authSlice.reducer,
});

// Define type for the root reducer
export type RootReducer = typeof rootReducer;
// Define type for the root state
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer; // Export the root reducer
