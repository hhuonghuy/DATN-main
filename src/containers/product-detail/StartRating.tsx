'use client';
import React, { useState } from 'react';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

interface StarRatingProps {
	rating: number;
	onRatingChange: (rating: number) => void;
}

const StarRatingComment: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
	const [hover, setHover] = useState(0);

	const handleMouseEnter = (index: number) => {
		setHover(index + 1);
	};

	const handleMouseLeave = () => {
		setHover(0);
	};

	const handleClick = (index: number) => {
		onRatingChange(index);
	};

	return (
		<div className="star-rating">
			{Array.from({ length: 5 }).map((_, index) => (
				<span
					key={index}
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={handleMouseLeave}
					onClick={() => handleClick(index)}
					className="item"
					style={{ cursor: 'pointer' }}
				>
					{index < (hover || rating) ? <RiStarFill size={30} /> : <RiStarLine size={30} />}
				</span>
			))}
		</div>
	);
};

export default StarRatingComment;
