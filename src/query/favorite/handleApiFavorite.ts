import { publicRequest } from '@/configs/AxiosConfig';
import { API_ENDPOINT } from '@/utils/endpoint/api_endpoint';
import { useMutation, useQuery } from 'react-query';

interface FavoriteData {
	userId: string;
	productId: string;
}

// thêm sản phẩm yêu thích
export const usePostFavorite = () => {
	return useMutation(API_ENDPOINT.FAVORITE, async (data: FavoriteData): Promise<any> => {
		return await publicRequest.request({
			method: 'POST',
			url: API_ENDPOINT.FAVORITE,
			data: data,
		});
	});
};
// xóa sản phẩm yêu thích

export const useDeleteFavorite = (userId: any) => {
	return useMutation(API_ENDPOINT.DELETE_FAVORITE, async (productId: string): Promise<void> => {
		await publicRequest.request({
			method: 'DELETE',
			url: `${API_ENDPOINT.FAVORITE}/${userId}/${productId}`,
		});
	});
};

// lấy sản phẩm yêu thích của mỗi người sản phẩm  yêu thích

export const useGetFavoriteByUser = (userId: any) => {
	return useQuery([API_ENDPOINT.GET_FAVORITE_BY_USER, userId], async (): Promise<any> => {
		return await publicRequest.request({
			method: 'GET',
			url: `${API_ENDPOINT.FAVORITE}/${userId}`,
		});
	});
};
