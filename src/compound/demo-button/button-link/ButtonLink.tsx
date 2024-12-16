import { ROUTER } from '@/utils/routes/routes';
import Link from 'next/link';

interface IButtonLinkProps {
	children: React.ReactNode;
	className?: string;
	color?: 'primary' | 'secondary' | 'three';
}

const ButtonLink = ({ color = 'primary', children, className }: IButtonLinkProps) => {
	return (
		<Link
			href={ROUTER.PRODUCTS}
			className={`site-button-link -${color} ${className}`}
		>
			{children}
		</Link>
	);
};

export default ButtonLink;
