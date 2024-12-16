import ButtonLink from '@/compound/demo-button/button-link/ButtonLink';
import Image from 'next/image';

const Content = () => {
	return (
		<section className="section-content">
			<Image
				className="image"
				width={2200}
				height={400}
				src="https://lscoecomm.scene7.com/is/image/lscoecomm/23_OCT_REFRESH_HERO_501_16_6?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=2000&hei=750"
				alt="Banner"
				loading="lazy"
			/>

			<p className="title _text-center">You know it. You love it. You got to have it.</p>
			<div className="links container">
				<ButtonLink className="site-button _text-capitalize _text-center">Shop Men</ButtonLink>
				<ButtonLink className="site-button _text-capitalize _text-center">Shop women</ButtonLink>
			</div>
		</section>
	);
};

export default Content;
