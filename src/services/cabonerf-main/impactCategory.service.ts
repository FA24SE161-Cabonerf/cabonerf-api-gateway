import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { ImpactCategory } from '@gateway/models/cabonerf-main/impact-category.model';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';

class ImpactCategoryService {
	public async getImpactCategoriesByMethodId(payload: { id: string }) {
		const response = await mainAxiosService.axios.get<CommonResponse<ImpactCategory>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + `/${payload.id}` + ROUTE_ENDPOINTS.IMPACT_CATEGORIES
		);

		return response;
	}

	public async getImpactCategoryById(payload: { id: string }) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_CATEGORIES + `/${payload.id}`
		);

		return response;
	}
}

export default ImpactCategoryService;
