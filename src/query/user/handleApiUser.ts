import { publicRequest } from '@/configs/AxiosConfig';
import { CACHE_TIME, RETRY, STALE_TIME } from '@/utils/breakpoints/constants';
import { API_ENDPOINT } from '@/utils/endpoint/api_endpoint';
import { UseMutationOptions, useMutation, useQuery } from 'react-query';
export const useUserDetailQuery = (id: string | undefined) => {
	return useQuery(
		[API_ENDPOINT.GET_USER, id],
		async (): Promise<any> => {
			if (!id) {
				return Promise.reject('User ID is required');
			}
			return await publicRequest.request({
				method: 'GET',
				url: `${API_ENDPOINT.GET_USER}/${id}`,
			});
		},
		{
			enabled: !!id, // Only run the query if the id is truthy
			staleTime: STALE_TIME, // 5 minutes
			cacheTime: CACHE_TIME, // 10 minutes
			retry: RETRY, // Number of retry attempts in case of failure
		},
	);
};
interface PutInfoUserParams {
	id?: string;
	data?: any;
}
export const usePutInfoUser = (options?: UseMutationOptions<any, unknown, PutInfoUserParams>) => {
	return useMutation(
		async ({ id, data }: PutInfoUserParams): Promise<any> => {
			if (!id || !data) {
				throw new Error('ID and data must be provided');
			}

			return await publicRequest.request({
				method: 'PUT',
				url: `${API_ENDPOINT.GET_USER}/${id}`,
				data: data,
			});
		},
		{
			retry: RETRY, // Number of retry attempts in case of failure
			...options,
		},
	);
};
