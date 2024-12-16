import { Controller } from 'react-hook-form';

interface FormInputProps {
	name: string;
	label: string;
	control?: any;
	rules?: any;
	type?: string;
	errors: any;
}

const FormInput = ({ name, label, control, rules, type = 'text', errors }: FormInputProps) => {
	return (
		<div className="item">
			<label htmlFor={name}>{label}</label>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field }) => (
					<input
						id={name}
						{...field}
						type={type}
					/>
				)}
			/>
			<p className="error-message">{errors[name]?.message}</p>
		</div>
	);
};

export default FormInput;
