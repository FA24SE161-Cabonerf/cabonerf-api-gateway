import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { ImpactMethod } from '@gateway/models/cabonerf-main/impact.model';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { BaseImpactMethodReqBody } from '@gateway/types/impactMethod.types';

export class ImpactMethodService {
	public async getImpactMethods() {
		const response = await mainAxiosService.axios.get<CommonResponse<ImpactMethod[]>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS
		);

		return response;
	}

	public async getImpactMethodById(payload: { id: string }) {
		const response = await mainAxiosService.axios.get<CommonResponse<ImpactMethod>>(
			`${ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS}/${payload.id}`
		);

		return response;
	}

	public async createImpactMethod(payload: BaseImpactMethodReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS,
			payload
		);
		return response;
	}

	public async updateImpactMethodById(id: string, payload: BaseImpactMethodReqBody) {
		const response = await mainAxiosService.axios.put<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + `/${id}`,
			payload
		);
		return response;
	}

	public async deleteImpactMethodById(id: string) {
		const response = await mainAxiosService.axios.delete<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + `/${id}`
		);
		return response;
	}

	public async addCategoryToMethod(methodId: string, categoryId: string) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + `/${methodId}` + ROUTE_ENDPOINTS.IMPACT_CATEGORIES + `/${categoryId}`
		);
		return response;
	}

	public async getAllMethodName() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + '/name'
		);
		return response;
	}
}
