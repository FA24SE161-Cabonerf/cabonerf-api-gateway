import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { ImpactMethod } from '@gateway/models/cabonerf-main/impact.model';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { CreateImpactMethodReqBody } from '@gateway/types/impactMethod.types';

export class ImpactService {
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

	public async createImpactMethod(payload: CreateImpactMethodReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS,
			payload
		);
		return response;
	}
}
