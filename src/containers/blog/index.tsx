'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { campaigns } from './constants';

const CampaignSwiper = () => {
	return (
		<main className="main-blog">
			<h2 className="blog-title">Blog For Life</h2>

			<Swiper
				modules={[Scrollbar]}
				navigation
				spaceBetween={30}
				slidesPerView={3}
				scrollbar={{ draggable: true }}
				breakpoints={{
					320: { slidesPerView: 1.3 },
					640: { slidesPerView: 2.3 },
					768: { slidesPerView: 2.3 },
					1024: { slidesPerView: 3.3 },
				}}
			>
				{campaigns.map((campaign) => (
					<SwiperSlide key={campaign.id}>
						<div className="blog">
							<Link href={`blog/${campaign.id}`}>
								<Image
									width={600}
									height={600}
									className="image"
									src={campaign.image}
									alt={campaign.title}
									style={{ width: '100%', borderRadius: '8px' }}
								/>
							</Link>
							<p className="date">{campaign.date}</p>
							<h3 className="title">{campaign.title}</h3>
							<p className="description">{campaign.description}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</main>
	);
};

export default CampaignSwiper;
