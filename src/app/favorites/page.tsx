import PageFavorite from '@/containers/favorite';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Favorite - 2H3T Us',
	description: 'Favorite',
};

export default function page() {
	return <PageFavorite />;
}
