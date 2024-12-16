import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { AppState } from '..';
import modalSlice from './slice';

const ModalStore = (state: AppState) => get(state, modalSlice.name, modalSlice.getInitialState());

export const selectIsToggleModalRegister = createSelector([ModalStore], (state) =>
	get(state, 'isOpenModalRegister', false),
);

export const selectIsToggleModalLogin = createSelector([ModalStore], (state) => get(state, 'isOpenModalLogin', false));

export const selectIsToggleModalSale = createSelector([ModalStore], (state) => get(state, 'isOpenModalSale', false));
