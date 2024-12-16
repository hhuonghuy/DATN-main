'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { map } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { usePutInfoUser, useUserDetailQuery } from '@/query/user/handleApiUser';
import { selectInformationUserLoginEmail } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hook';
import { MENU_PROFILE } from './constants';

import Button from '@/compound/demo-button/button/Button';
import ModalNotification from '@/modals/notification/Notification';
import {
    useGetCommuneLocation,
    useGetDistrictLocation,
    useGetProvinceLocation,
} from '@/query/locations/handleApiLocation';

const schema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	phone: yup.string().required('Phone is required'),
	province: yup.string().required('Province is required'),
	district: yup.string().required('District is required'),
	commune: yup.string().required('Commune is required'),
});

export default function PageProfile() {
	const router = useRouter();
	const inforUser = useAppSelector(selectInformationUserLoginEmail);
	const id_User = inforUser?._id;


	const {
		data: DATA_USER,
		isLoading: LOADING_USER,
		refetch: REFETCH_DATA_USER,
	} = useUserDetailQuery(id_User as string);


	const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
	const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
	const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
	const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);
	const [selectedCommuneName, setSelectedCommuneName] = useState<string | null>(null);

	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	const { data: DATA_PROVINCE, refetch: refetchProvinces } = useGetProvinceLocation();
	const { data: DATA_DISTRICT, refetch: refetchDistricts } = useGetDistrictLocation(selectedProvince as string);
	const { data: DATA_COMMUNE, refetch: refetchCommunes } = useGetCommuneLocation(selectedDistrict as string);

	const { mutate: MUTATION_USER, isLoading: LOADING_POST_USER } = usePutInfoUser();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
		trigger,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			province: '',
			district: '',
			commune: '',
		},
	});

	useEffect(() => {
		if (DATA_USER) {
			setValue('firstName', DATA_USER.firstName);
			setValue('lastName', DATA_USER.lastName);
			setValue('email', DATA_USER.email);
			setValue('phone', DATA_USER.phone ? `0${DATA_USER.phone}` : '');
			setSelectedProvince(DATA_USER.province);
			setSelectedDistrict(DATA_USER.district);
			setSelectedProvinceName(DATA_USER.province);
			setSelectedDistrictName(DATA_USER.district);
			setSelectedCommuneName(DATA_USER.commune);
		}
	}, [DATA_USER, setValue]);

	const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const selectedProvince = DATA_PROVINCE.find((province: any) => province.idProvince === selectedValue);
		if (selectedProvince) {
			setSelectedProvinceName(selectedProvince.name);
		}
		setSelectedProvince(selectedValue);
		setValue('province', selectedValue);
		setSelectedDistrict(null);
		setSelectedCommuneName(null);
	};

	const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const selectedDistrict = DATA_DISTRICT.find((district: any) => district.idDistrict === selectedValue);
		if (selectedDistrict) {
			setSelectedDistrictName(selectedDistrict.name);
		}
		setSelectedDistrict(selectedValue);
		setValue('district', selectedValue);
		setSelectedCommuneName(null);
	};

	const handleCommuneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const selectedCommune = DATA_COMMUNE.find((commune: any) => commune.idCommune === selectedValue);
		if (selectedCommune) {
			setSelectedCommuneName(selectedCommune.name);
		}
		setValue('commune', selectedValue);
	};

	const onSubmit = async (data: any) => {
		const isFormValid = await trigger();
		if (isFormValid) {
			const province = DATA_PROVINCE.find((province: any) => province.idProvince === data.province)?.name;
			const district = DATA_DISTRICT.find((district: any) => district.idDistrict === data.district)?.name;
			const commune = DATA_COMMUNE.find((commune: any) => commune.idCommune === data.commune)?.name;

			const updatedData = {
				...data,
				province,
				district,
				commune,
			};

			MUTATION_USER(
				{ id: id_User, data: updatedData },
				{
					onSuccess: () => {
						refetchProvinces();
						REFETCH_DATA_USER();
						setModalMessage('Update your information successfully.');
						setModalVisible(true);
						setSelectedProvinceName(updatedData.province);
						setSelectedDistrictName(updatedData.district);
						setSelectedCommuneName(updatedData.commune);
						if (selectedProvince) {
							refetchDistricts();
						}
						if (selectedDistrict) {
							refetchCommunes();
						}
					},
				},
			);
		}
	};

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | undefined;
		if (modalVisible) {
			timer = setTimeout(() => {
				setModalVisible(false);
			}, 3000);
		}
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [modalVisible]);

	if (!inforUser) {
		router.push('/');
		return null;
	}

	if (LOADING_USER) {
		return (
			<div className="site-loading">
				<div className="chaotic-orbit"></div>
			</div>
		);
	}

	return (
		<main className="site-profile container">
			<ModalNotification
				stateModalVisible={modalVisible}
				message={modalMessage}
				onClose={() => setModalVisible(false)}
			/>

			<div className="profile-account">
				<ul className="account-navigation">
					{map(MENU_PROFILE, ({ label, route }) => (
						<li
							key={label}
							className="nav-list-item"
						>
							<Link
								href={route}
								className="link"
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<form
				className="form-profile-wrapper"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h4>Profile</h4>
				<div className="form-box-account">
					<div className="form-field">
						<label htmlFor="firstName">First name*</label>
						<Controller
							name="firstName"
							control={control}
							render={({ field }) => (
								<input
									id="firstName"
									type="text"
									{...field}
								/>
							)}
						/>
						{errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
					</div>
					<div className="form-field">
						<label htmlFor="lastName">Last name*</label>
						<Controller
							name="lastName"
							control={control}
							render={({ field }) => (
								<input
									id="lastName"
									type="text"
									{...field}
								/>
							)}
						/>
						{errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
					</div>
					<div className="form-field">
						<label htmlFor="email">Email*</label>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<input
									id="email"
									type="email"
									{...field}
								/>
							)}
						/>
						{errors.email && <p className="error-message">{errors.email.message}</p>}
					</div>
					<div className="form-field">
						<label htmlFor="phone">Phone*</label>
						<Controller
							name="phone"
							control={control}
							render={({ field }) => (
								<input
									id="phone"
									type="text"
									{...field}
								/>
							)}
						/>
						{errors.phone && <p className="error-message">{errors.phone.message}</p>}
					</div>
				</div>
				<div className="form-box-address">
					<div className="form-field">
						<label htmlFor="province">Province*</label>
						<Controller
							name="province"
							control={control}
							render={({ field }) => (
								<select
									{...field}
									onChange={(e) => handleProvinceChange(e)}
								>
									<option value="">{selectedProvinceName || 'Select a province'}</option>
									{DATA_PROVINCE?.map((province: any) => (
										<option
											key={province.idProvince}
											value={province.idProvince}
										>
											{province.name}
										</option>
									))}
								</select>
							)}
						/>
						{errors.province && <p className="error-message">{errors.province.message}</p>}
					</div>
					<div className="form-field">
						<label htmlFor="district">District*</label>
						<Controller
							name="district"
							control={control}
							render={({ field }) => (
								<select
									{...field}
									onChange={(e) => handleDistrictChange(e)}
								>
									<option value="">{selectedDistrictName || 'Select a province'}</option>
									{DATA_DISTRICT?.map((district: any) => (
										<option
											key={district.idDistrict}
											value={district.idDistrict}
										>
											{district.name}
										</option>
									))}
								</select>
							)}
						/>
						{errors.district && <p className="error-message">{errors.district.message}</p>}
					</div>
					<div className="form-field">
						<label htmlFor="commune">Commune*</label>
						<Controller
							name="commune"
							control={control}
							render={({ field }) => (
								<select
									{...field}
									onChange={(e) => handleCommuneChange(e)}
								>
									<option value="">{selectedCommuneName || 'Select a province'}</option>
									{DATA_COMMUNE?.map((commune: any) => (
										<option
											key={commune.idCommune}
											value={commune.idCommune}
										>
											{commune.name}
										</option>
									))}
								</select>
							)}
						/>
						{errors.commune && <p className="error-message">{errors.commune.message}</p>}
					</div>
				</div>
				<Button
					type="submit"
					disabled={LOADING_POST_USER}
				>
					{LOADING_POST_USER ? 'Updating...' : 'Update Profile'}
				</Button>
			</form>
		</main>
	);
}
