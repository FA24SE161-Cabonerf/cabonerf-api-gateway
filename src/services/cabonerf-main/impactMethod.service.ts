import { API_PARAMS } from '@gateway/constants/apiParams.';
import { ImpactCategory } from '@gateway/models/cabonerf-main/impact-category.model';
import { ImpactMethod } from '@gateway/models/cabonerf-main/impact.model';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';

export class ImpactService {
	public async getImpactMethods() {
		const response = await mainAxiosService.axios.get<CommonResponse<ImpactMethod[]>>(API_PARAMS.IMPACTS + API_PARAMS.IMPACT_METHODS);

		return response;
	}

	public async getImpactMethodById(payload: { id: string }) {
		const response = await mainAxiosService.axios.get<CommonResponse<ImpactMethod>>(
			`${API_PARAMS.IMPACTS + API_PARAMS.IMPACT_METHODS}/${payload.id}`
		);

		return response;
	}

	public async getImpactCategoriesByMethodId(payload: { id: string }) {
		const response = await mainAxiosService.axios.get<CommonResponse<ImpactCategory>>(
			API_PARAMS.IMPACTS + API_PARAMS.IMPACT_METHODS + `/${payload.id}` + API_PARAMS.CATEGORIES
		);

		return response;
	}

	public async createImpactMethod(payload: CreateImpactMethodReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(API_PARAMS.IMPACTS + API_PARAMS.IMPACT_METHODS, payload);
		return response;
	}
}
