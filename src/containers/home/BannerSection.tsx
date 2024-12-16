import ButtonLink from '@/compound/demo-button/button-link/ButtonLink';

interface IPropsBanner {
	subtitle: string;
	title: string;
	description: string;
	footer?: string;
	className?: string;
}

export default function BannerSection({ subtitle, title, description, footer, className }: IPropsBanner) {
	return (
		<section className={`home-banner-section _text-center ${className}`}>
			<p className="subtitle _text-uppercase">{subtitle}</p>
			<h3 className="title _text-uppercase">{title}</h3>
			<p className="description">{description}</p>
			<div className="links">
				<ButtonLink>Shop Men</ButtonLink>
				<ButtonLink>Shop Women</ButtonLink>
				<ButtonLink>Shop Kids</ButtonLink>
			</div>
			<p className="footer _text-light-success _fz-xs">{footer}</p>
		</section>
	);
}
