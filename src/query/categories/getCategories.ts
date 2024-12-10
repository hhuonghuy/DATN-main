import { publicRequest } from '@/configs/AxiosConfig';
import { CACHE_TIME, RETRY, STALE_TIME } from '@/utils/breakpoints/constants';
import { API_ENDPOINT } from '@/utils/endpoint/api_endpoint';
import { useQuery } from 'react-query';

export const useCategoriesQuery = () => {
	return useQuery(
		API_ENDPOINT.CATEGORIES,
		async (): Promise<any> => {
			return await publicRequest.request({
				method: 'GET',
				url: API_ENDPOINT.CATEGORIES,
			});
		},
		{
			staleTime: STALE_TIME, // 5 minutes
			cacheTime: CACHE_TIME, // 10 minutes
			retry: RETRY, // Number of retry attempts in case of failure
			refetchOnWindowFocus: false,
		},
	);
};
