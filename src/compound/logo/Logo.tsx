import CustomImage from '@/compound/customImage/CustomImage';
import { ROUTER } from '@/utils/routes/routes';
import Link from 'next/link';
import LogoSrc from '../../assets/images/logo/logoSpeedTour.jpg';

const Logo = () => {
	return (
		<>
			<Link
				href={ROUTER.HOME}
				className="logo-image"
			>
				{/* <div className="logo">Hana&#39;s</div> */}
				<CustomImage
					width={230}
					height={70}
					src={LogoSrc.src}
					alt="Logo-SpeedTour"
				/>
			</Link>
		</>
	);
};

export default Logo;
