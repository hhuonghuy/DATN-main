import YourOrder from '@/containers/your_order';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Your Order - 2H3T Us',
	description: 'Order',
};

export default function page() {
	return <YourOrder />;
}
