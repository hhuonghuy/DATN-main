import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { AppState } from '..';
import cartSlice from './slice';

const cartStore = (state: AppState) => get(state, cartSlice.name, cartSlice.getInitialState());

export const selectIsOpenCartDrawer = createSelector([cartStore], (state) => get(state, 'isOpen', false));

export const selectCartItems = createSelector([cartStore], (state) => get(state, 'cartItems', []));
