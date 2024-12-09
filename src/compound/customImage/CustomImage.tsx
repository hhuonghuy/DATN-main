'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface CustomImageProps {
	src?: string;
	alt: string;
	defaultSrc?: string;
	width?: number;
	height?: number;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, defaultSrc = '', width, height, ...props }) => {
	const [imageSrc, setImageSrc] = useState<string>(src || '');

	const [error, setError] = useState<boolean>(false);

	const handleError = () => {
		setError(true);
		setImageSrc(defaultSrc || ''); // Ensure defaultSrc is a string
	};

	return (
		<>
			{error ? (
				<Image
					className="image-item"
					width={width}
					height={height}
					src={imageSrc}
					alt={alt}
					onError={handleError}
					{...props}
				/>
			) : (
				<Image
					className="image-item"
					width={width}
					height={height}
					src={imageSrc}
					alt={alt}
					onError={handleError}
					{...props}
				/>
			)}
		</>
	);
};

export default CustomImage;
