'use client';

// base
import { useEffect, useRef, useState } from 'react';

// components
import Button from '@/compound/demo-button/button/Button';
import FormInput from '@/compound/formInput/FormInput';
// icons
import { GrFormClose } from '../../compound/icons/index';
// redux
import { loginEmailFailure, loginEmailSuccess, loginWithGoogle } from '@/redux/auth/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { selectIsToggleModalLogin } from '@/redux/modal/selector';
import { closeModalLogin, openModalRegister } from '@/redux/modal/slice';
// custom-hook
import useNoScrollBody from '@/custom-hook/useNoScrollBody';

// react-hook-form
import { useForm } from 'react-hook-form';
// react-query
import { useLoginMutation } from '@/query/authentication/authentication';
// Yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalNotification from '../notification/Notification';
const schema = yup.object().shape({
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup.string().required('Password is required'),
});

interface ILoginProps {
	email: string;
	password: string;
}
const Login = () => {
	// state notification
	const [modalVisible, setModalVisible] = useState(true);
	const [modalMessage, setModalMessage] = useState('');
	// redux handle modal
	const isOpenToggleModalLogin = useAppSelector(selectIsToggleModalLogin);
	const dispatch = useAppDispatch();
	// handle authentication Email firebase
	const handleGoogleLogin = () => {
		dispatch(loginWithGoogle());
	};
	// handle click out side
	const loginInnerRef = useRef<HTMLDivElement | null>(null);
	const closeModalIfOutsideClick = (event: MouseEvent) => {
		if (loginInnerRef.current && !loginInnerRef.current.contains(event.target as Node)) {
			closeModal();
		}
	};

	useEffect(() => {
		if (isOpenToggleModalLogin) {
			document.addEventListener('click', closeModalIfOutsideClick);
		} else {
			document.removeEventListener('click', closeModalIfOutsideClick);
		}

		return () => {
			document.removeEventListener('click', closeModalIfOutsideClick);
		};
	}, [isOpenToggleModalLogin]);

	// handle hidden scroll body
	useNoScrollBody(isOpenToggleModalLogin);
	// handle close modal
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | undefined;
		if (modalVisible) {
			timer = setTimeout(() => {
				setModalVisible(false);
			}, 3000); // Close modal after 2 seconds
		}
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [modalVisible]);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginProps>({
		resolver: yupResolver(schema),
	});
	const closeModal = () => {
		dispatch(closeModalLogin());
	};
	// handle modal toggle
	const handleOpenModalRegister = async () => {
		await dispatch(closeModalLogin());
		dispatch(openModalRegister());
	};
	// Handle form submission here
	const { mutate: MUTATION_LOGIN, isLoading: LOADING_LOGIN } = useLoginMutation();
	const onLoginSubmit = async (data: any) => {
		MUTATION_LOGIN(data, {
			onSuccess: async (data) => {
				try {
					await setModalVisible(true);
					await setModalMessage('Successfully logged in!');
					const inforUser = data.data;
					dispatch(loginEmailSuccess(inforUser));
					dispatch(closeModalLogin());
				} catch (error) {
					dispatch(loginEmailFailure(error));
				}
			},
			onError: () => {
				setModalVisible(true);
				setModalMessage('Please double-check your password or account.');
			},
		});
	};
	return (
		<section className={`login-wrapper _overlay ${isOpenToggleModalLogin ? '-show' : ''}`}>
			{/* Modal Notification */}
			<ModalNotification
				stateModalVisible={modalVisible}
				message={modalMessage}
				onClose={() => setModalVisible(false)}
			/>
			{/* description */}
			<div
				className="login-inner _custom-scrollbar"
				ref={loginInnerRef}
			>
				<GrFormClose
					className="icon"
					onClick={closeModal}
				/>
				<div className="desc _text-center">
					<h4 className="title _text-uppercase">
						<p>2H3T&#39;s</p>REDTAB™
					</h4>
					<p className="content">Welcome back!</p>
					<p className="description ">Log in for faster checkout and see all your benefits.</p>
				</div>
				{/* form login */}
				<form
					className="form-login-inner"
					onSubmit={handleSubmit(onLoginSubmit)}
				>
					<FormInput
						name="email"
						label="Email*"
						control={control}
						type="text"
						errors={errors}
					/>
					<FormInput
						name="password"
						label="Password*"
						control={control}
						type="password"
						errors={errors}
					/>

					<Button
						type="submit"
						className="btn-submit"
					>
						{LOADING_LOGIN ? 'Loading...' : 'Log in'}
					</Button>
					<button
						className="btn-open-modal"
						type="button"
						onClick={handleOpenModalRegister}
					>
						Create a new account
					</button>
				</form>
				{/* login with google */}
				<div className="separator">
					<div className="text">OR</div>
				</div>
				<Button
					type="submit"
					className="btn-login-google"
					onClick={handleGoogleLogin}
				>
					Log In With Google
				</Button>
				<div className="notice">
					By creating an account, I agree to the <p>LS&Co. Terms of Use</p> and the
					<p> Terms and Conditions.</p> LS&Co. <p>Privacy Policy and</p>
				</div>
			</div>
		</section>
	);
};

export default Login;
