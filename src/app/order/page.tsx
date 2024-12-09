import PageOrder from '@/containers/order';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Order - 2H3T Us',
	description: 'Order',
};

export default function page() {
	return <PageOrder />;
}
