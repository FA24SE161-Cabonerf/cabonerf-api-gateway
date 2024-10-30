import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';
export class MidpointCategoryService {
	public async getAllMidpointCategories() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_CATEGORIES);
		return response;
	}
}
