import { publicRequest } from '@/configs/AxiosConfig';
import { CACHE_TIME, RETRY, STALE_TIME } from '@/utils/breakpoints/constants';

import { API_ENDPOINT } from '@/utils/endpoint/api_endpoint';
import { ProductDetail, ProductsByCategory } from '@/utils/type';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useProductsQuery = (page: any, pageSize: any) => {
	return useQuery(
		[API_ENDPOINT.PRODUCTS, page, pageSize],
		async (): Promise<any> => {
			return await publicRequest.request({
				method: 'GET',
				url: API_ENDPOINT.PRODUCTS,
				params: { page, pageSize },
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

export const useFilterProductsQuery = (name: any) => {
	return useQuery(
		[API_ENDPOINT.FILTER_PRODUCT, name],
		async (): Promise<any> => {
			return await publicRequest.request({
				method: 'GET',
				url: API_ENDPOINT.FILTER_PRODUCT,
				params: { name },
			});
		},
		{
			enabled: !!name,
			staleTime: STALE_TIME, // 5 minutes
			cacheTime: CACHE_TIME, // 10 minutes
			retry: RETRY, // Number of retry attempts in case of failure
			refetchOnWindowFocus: false,
		},
	);
};
export const useProductDetailQuery = (slug: string) => {
	return useQuery(
		[API_ENDPOINT.PRODUCTDETAIL, slug],
		async (): Promise<ProductDetail> => {
			return await publicRequest.request({
				method: 'GET',
				url: `${API_ENDPOINT.PRODUCTDETAIL}/${slug}`,
			});
		},
		{
			staleTime: STALE_TIME, // 5 minutes
			cacheTime: CACHE_TIME, // 10 minutes
			retry: RETRY, // Number of retry attempts in case of failure
		},
	);
};

export const useProductsByCategoryQuery = (categoryId: any, page: any, pageSize: any) => {
	return useQuery(
		[API_ENDPOINT.PRODUCTS, categoryId, page, pageSize],
		async (): Promise<ProductsByCategory> => {
			return await publicRequest.request({
				method: 'GET',
				url: `${API_ENDPOINT.PRODUCTS}/category/${categoryId}`,
				params: { page, pageSize },
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

// Add Rating and Comment
export const useAddRatingAndCommentMutation = (slug: string) => {
	const queryClient = useQueryClient();

	return useMutation(
		async (data: { userId: string; rating: number; comment: string }) => {
			return await publicRequest.request({
				method: 'POST',
				url: `${API_ENDPOINT.PRODUCTDETAIL}/${slug}/ratings`,
				data,
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries([API_ENDPOINT.PRODUCTDETAIL, slug]);
			},
		},
	);
};

// Update Comment
