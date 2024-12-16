import { publicRequest } from '@/configs/AxiosConfig';
import { useAppDispatch } from '@/redux/hook';
import { closeModalRegister, openModalLogin } from '@/redux/modal/slice';
import { API_ENDPOINT } from '@/utils/endpoint/api_endpoint';
import { useMutation } from 'react-query';
export const useLoginMutation = () => {
	const dispatch = useAppDispatch();

	return useMutation(API_ENDPOINT.LOGIN, async (data): Promise<any> => {
		return await publicRequest.request({
			method: 'POST',
			url: API_ENDPOINT.LOGIN,
			data: data,
		});
	});
};

export const useRegisterMutation = () => {
	const dispatch = useAppDispatch();

	const handleSuccessOpenModalLogin = async () => {
		await dispatch(closeModalRegister());
		dispatch(openModalLogin());
	};

	return useMutation(
		API_ENDPOINT.REGISTER,
		async (fromData): Promise<any> => {
			return await publicRequest.request({
				method: 'POST',
				url: API_ENDPOINT.REGISTER,
				data: fromData,
			});
		},
		{
			onSuccess: handleSuccessOpenModalLogin,
			onError: (error: Error) => {
				console.error('Register error:', error);
			},
		},
	);
};
