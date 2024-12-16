'use client';
import { Provider } from 'react-redux';
import { store } from './index';

interface IPropsRedux {
	children: React.ReactNode;
}

export function ReduxProvider({ children }: IPropsRedux) {
	return <Provider store={store}>{children}</Provider>;
}
