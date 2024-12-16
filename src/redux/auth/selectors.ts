import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { AppState } from '..';
import authSlice from '../auth/slice';

const AuthenticationStore = (state: AppState) => get(state, authSlice.name, authSlice.getInitialState());

export const selectInformationUserLoginEmail = createSelector([AuthenticationStore], (state) =>
	get(state, 'user', null),
);
