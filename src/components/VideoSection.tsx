'use client';
import ButtonLink from '@/compound/demo-button/button-link/ButtonLink';
import { useEffect, useRef } from 'react';

interface VideoSectionProps {
	id?: number;
	videoSrc: string;
	title: string;
	content: string;
}

export const VideoSection = ({ id, videoSrc, title, content }: VideoSectionProps) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play();
		}
	}, []);

	return (
		<div
			className="discover-wrapper"
			key={id}
		>
			<div className="video">
				<video
					controls
					width={500}
					height={500}
					autoPlay
					loop
					ref={videoRef}
					muted
					playsInline
				>
					<source
						src={videoSrc}
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
			</div>
			<div className="desc">
				<h4 className="title _text-uppercase">{title}</h4>
				<p className="content">{content}</p>
				<div className="links">
					<ButtonLink>Shop Men</ButtonLink>
					<ButtonLink>Shop Women</ButtonLink>
				</div>
			</div>
		</div>
	);
};
