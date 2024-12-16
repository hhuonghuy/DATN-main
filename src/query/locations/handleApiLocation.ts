import { publicRequest } from '@/configs/AxiosConfig';
import { CACHE_TIME, RETRY, STALE_TIME } from '@/utils/breakpoints/constants';
import { useQuery } from 'react-query';

export const useGetProvinceLocation = () => {
	return useQuery(
		'location',
		async (): Promise<any> => {
			return await publicRequest.request({
				method: 'GET',
				url: `https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province`,
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

export const useGetDistrictLocation = (idProvince: any) => {
	return useQuery(
		['district', idProvince],
		async (): Promise<any> => {
			return await publicRequest.request({
				method: 'GET',
				url: `https://toinh-api-tinh-thanh.onrender.com/district`,
				params: { idProvince },
			});
		},
		{
			staleTime: STALE_TIME, // 5 minutes
			cacheTime: CACHE_TIME, // 10 minutes
			retry: RETRY, // Number of retry attempts in case of failure
			refetchOnWindowFocus: false,
			enabled: !!idProvince, // Ensure the query runs only if idProvince is provided
		},
	);
};

export const useGetCommuneLocation = (idDistrict: any) => {
	return useQuery(
		['commune', idDistrict],
		async (): Promise<any> => {
			return await publicRequest.request({
				method: 'GET',
				url: `https://toinh-api-tinh-thanh.onrender.com/commune`,
				params: { idDistrict },
			});
		},
		{
			staleTime: STALE_TIME, // 5 minutes
			cacheTime: CACHE_TIME, // 10 minutes
			retry: RETRY, // Number of retry attempts in case of failure
			refetchOnWindowFocus: false,
			enabled: !!idDistrict, // Ensure the query runs only if idProvince is provided
		},
	);
};
