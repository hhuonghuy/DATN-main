'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

interface IPropsQuery {
	children: React.ReactNode;
}

export function ReactQueryProvider({ children }: IPropsQuery) {
	const queryClient = new QueryClient();
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
