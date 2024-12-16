'use client';

import FormInput from '@/compound/formInput/FormInput';
import {
	useGetCommuneLocation,
	useGetDistrictLocation,
	useGetProvinceLocation,
} from '@/query/locations/handleApiLocation';
import { usePostOrder } from '@/query/order/handleOrder';
import { useUserDetailQuery } from '@/query/user/handleApiUser';
import { selectInformationUserLoginEmail } from '@/redux/auth/selectors';
import { clearCart } from '@/redux/cart/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { ROUTER } from '@/utils/routes/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface OrderFormData {
	name: string;
	address: string;
	province: string;
	district: string;
	commune: string;
	phone: string;
	note?: string;
}

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	address: yup.string().required('Address is required'),
	province: yup.string().required('Province is required'),
	district: yup.string().required('District is required'),
	commune: yup.string().required('Commune is required'),
	phone: yup
		.string()
		.required('Phone Number is required')
		.matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits'),
	note: yup.string(),
});

const OrderFormInformation = ({ itemBagCart, total }: any) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [selectedProvince, setSelectedProvince] = useState<string | null>('');
	const [selectedDistrict, setSelectedDistrict] = useState<string | null>('');
	const [selectedCommune, setSelectedCommune] = useState<string | null>(null);
	const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
	const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);
	const [selectedCommuneName, setSelectedCommuneName] = useState<string | null>(null);
	const { mutate: MUTATION_ORDER, isLoading: LOADING_ORDER } = usePostOrder();
	const inforUser = useAppSelector(selectInformationUserLoginEmail);
	const userId = inforUser?._id || null;

	const { data: DATA_USER } = useUserDetailQuery(userId as string);
	const { data: DATA_PROVINCE } = useGetProvinceLocation();
	const { data: DATA_DISTRICT } = useGetDistrictLocation(selectedProvince);
	const { data: DATA_COMMUNE } = useGetCommuneLocation(selectedDistrict);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		trigger,
	} = useForm<OrderFormData>({
		resolver: yupResolver(schema),
	});

	// Populate form fields with user data on initial load

	const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const selectedProvince = DATA_PROVINCE?.find((province: any) => province.idProvince === selectedValue);
		if (selectedProvince) {
			setSelectedProvinceName(selectedProvince.name);
		}
		setSelectedProvince(selectedValue);
		setSelectedDistrict(null);
		setSelectedCommune(null);
	};

	const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const selectedDistrict = DATA_DISTRICT?.find((district: any) => district.idDistrict === selectedValue);
		if (selectedDistrict) {
			setSelectedDistrictName(selectedDistrict.name);
		}
		setSelectedDistrict(selectedValue);
		setSelectedCommune(null);
	};

	const handleCommuneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const selectedCommune = DATA_COMMUNE?.find((commune: any) => commune.idCommune === selectedValue);
		if (selectedCommune) {
			setSelectedCommuneName(selectedCommune.name);
		}
		setSelectedCommune(selectedValue);
	};

	useEffect(() => {
		// Populate form fields with user data when DATA_USER is loaded
		if (DATA_USER) {
			setValue('name', DATA_USER.firstName || '');
			setValue('phone', DATA_USER.phone ? `0${DATA_USER.phone}` : '');
			setValue('address', DATA_USER.address || '');
			setValue('province', DATA_USER.province || '');
			setValue('district', DATA_USER.district || '');
			setValue('commune', DATA_USER.commune || '');
		} else {
			// If DATA_USER is not available, set default values (optional)
			setValue('name', '');
			setValue('phone', '');
			setValue('address', '');
			setValue('province', '');
			setValue('district', '');
			setValue('commune', '');
		}
	}, [DATA_USER, setValue]);
	console.log(DATA_USER?.phone);

	const onSubmit = async (data: OrderFormData) => {
		const isFormValid = await trigger();
		if (isFormValid) {
			const cartItems = itemBagCart.map((item: any) => ({
				productId: item.id,
				quantity: item.quantity,
				size: item.size,
			}));

			const orderData = {
				userId: DATA_USER._id || userId,
				name: data.name || DATA_USER.firstName, // Use form data if present, otherwise use USER_DATA
				note: data.note || '',
				address: data.address || DATA_USER.address || '',
				province: selectedProvinceName || DATA_USER.province || '',
				district: selectedDistrictName || DATA_USER.district || '',
				commune: selectedCommuneName || DATA_USER.commune || '',
				phone: data.phone || `0${DATA_USER.phone}` || '',
				cartItems: cartItems,
				total: total,
				status: 'success',
			};

			MUTATION_ORDER(orderData as any, {
				onSuccess: async () => {
					await reset();
					await dispatch(clearCart());
					router.push(ROUTER.YOUR_ORDER);
				},
			});
		}
	};

	return (
		<div className="order-information-inner">
			{LOADING_ORDER && (
				<div className="site-loading">
					<div className="chaotic-orbit"></div>
				</div>
			)}
			<h3 className="title">SECURE CHECKOUT</h3>
			<form
				className="order-form-wrapper"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="order-form-box">
					<h3 className="items-title">Shipping Address</h3>
					<FormInput
						name="name"
						label="Name*"
						control={control}
						rules={schema.fields.name}
						errors={errors}
					/>
					<div className="form-input">
						<label>Province*</label>
						<Controller
							name="province"
							control={control}
							render={({ field }) => (
								<select
									{...field}
									onChange={(e) => {
										field.onChange(e);
										handleProvinceChange(e);
									}}
								>
									<option value="">{DATA_USER?.province || 'Select a province'}</option>

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
					<div className="form-input">
						<label>District*</label>
						<Controller
							name="district"
							control={control}
							render={({ field }) => (
								<select
									{...field}
									onChange={(e) => {
										field.onChange(e);
										handleDistrictChange(e);
									}}
								>
									<option value="">{DATA_USER?.district || 'Select a district'}</option>
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
					<div className="form-input">
						<label>Commune*</label>
						<Controller
							name="commune"
							control={control}
							render={({ field }) => (
								<select
									{...field}
									onChange={(e) => {
										field.onChange(e);
										handleCommuneChange(e);
									}}
								>
									<option value="">{DATA_USER?.commune || 'Select a commune'}</option>
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
					<FormInput
						name="address"
						label="Address*"
						control={control}
						rules={schema.fields.address}
						errors={errors}
					/>

					<FormInput
						name="phone"
						label="Phone Number*"
						control={control}
						rules={schema.fields.phone}
						type="number"
						errors={errors}
					/>
					<FormInput
						name="note"
						label="Note for shipper"
						control={control}
						rules={schema.fields.note}
						errors={errors}
					/>
				</div>
				<button
					className="button"
					type="submit"
				>
					Save
				</button>
			</form>
		</div>
	);
};

export default OrderFormInformation;
