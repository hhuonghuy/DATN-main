import Button from '@/compound/demo-button/button/Button';

const Contact = () => {
	return (
		<section className="contact">
			<div className="sale-box">
				<p className="sale">20% OFF + FREE SHIPPING</p>
				<p className="content">For All New 2H3T&#39;s® Email Subscribers.</p>
			</div>
			<div className="field-box">
				<div className="field">
					<label
						htmlFor="email"
						className="label"
					>
						Email*
					</label>
					<input
						id="email"
						className="input"
						type="text"
					/>
				</div>
				<Button
					color="primary"
					className="button _text-capitalize _text-center"
					type="button"
				>
					Sign Up
				</Button>
			</div>
		</section>
	);
};

export default Contact;
