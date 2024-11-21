import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { BaseMidpointCategoryReqBody } from '@gateway/types/midpointCategory.types';
export class MidpointCategoryService {
	public async getAllMidpointCategories() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_CATEGORIES);
		return response;
	}
	public async createMidpointCategory(payload: BaseMidpointCategoryReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_CATEGORIES,
			payload
		);
		return response;
	}
	public async updateMidpointCategory(id: string, payload: BaseMidpointCategoryReqBody) {
		const response = await mainAxiosService.axios.put<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_CATEGORIES + `/${id}`,
			payload
		);
		return response;
	}
	public async deleteMidpointCategory(id: string) {
		const response = await mainAxiosService.axios.delete<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_CATEGORIES + `/${id}`
		);
		return response;
	}
}
