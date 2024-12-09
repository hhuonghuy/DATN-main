'use client';
import { CommentData } from '@/utils/type';
import { useState } from 'react';
import { RiStarFill } from 'react-icons/ri';
import { RiVerifiedBadgeFill } from '../../compound/icons/index';
import StarRatingComment from './StartRating';

interface CommentProps {
	_id?: string;
	userId: { _id: string; firstName: string; lastName: string; email: string } | undefined;
	comments: CommentData[];
	onAddComment: (commentData: CommentData) => void;
}
const Comment: React.FC<CommentProps> = ({ userId, comments, onAddComment }) => {
	const [newComment, setNewComment] = useState('');
	const [rating, setRating] = useState(0);

	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNewComment(e.target.value);
	};

	const handleSetRating = (index: number) => {
		setRating(index + 1);
	};

	const handleSubmit = () => {
		if (newComment.trim() && userId) {
			const newCommentData: CommentData = {
				userId,
				comment: newComment,
				createdAt: new Date().toISOString(),
				rating: rating,
			};
			onAddComment(newCommentData);
			setNewComment('');
			setRating(0); // Reset rating after submitting
		}
	};

	return (
		<section className="comment-wrapper container">
			<h6 className="title">Reviews</h6>
			<p className="qty-comment">{Array.isArray(comments) ? comments?.length : 0} Reviews</p>
			<StarRatingComment
				rating={rating}
				onRatingChange={handleSetRating}
			/>
			<div className="write-review _border-bottom">
				<label
					htmlFor="comment"
					className="label"
				>
					Write review
				</label>
				<textarea
					name="comment"
					id="comment"
					className="field"
					value={newComment}
					onChange={handleCommentChange}
				/>
				<button onClick={handleSubmit}>Submit</button>
			</div>
			<div className="comment-lists">
				{Array.isArray(comments) &&
					comments?.map((comment: CommentData) => (
						<div
							className="comment-item _border-bottom"
							key={comment?._id}
						>
							<p className="name">
								{comment?.userId?.email}
								<RiVerifiedBadgeFill className="icon" />
							</p>
							<div className="rating">
								{' '}
								{[...Array(comment.rating)].map((_, index) => (
									<RiStarFill
										size={14}
										className="star-icon"
										key={index}
									/>
								))}
							</div>
							<p className="content">{comment?.comment}</p>
							<p className="date">{new Date(comment?.createdAt).toDateString()}</p>
						</div>
					))}
			</div>
		</section>
	);
};

export default Comment;
