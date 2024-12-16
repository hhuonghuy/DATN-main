import cn from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: React.ReactNode;
	color?: 'primary' | 'secondary';
	className?: string;
}

const Button = ({ color = 'primary', className = '', children, ...rest }: IButtonProps) => {
	return (
		<button
			className={cn('site-button', `-${color}`, className)}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
