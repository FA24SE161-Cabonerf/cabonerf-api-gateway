import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse, ParamID } from '@gateway/types/common.types';
import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

export class MidpointService {
	public async getAllMidpointFactors() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_FACTORS);
		return response;
	}
	public async getAllMidpointFactorsForAdmin(payload: PaginationRequest) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.MIDPOINT_FACTORS,
			{
				params: {
					currentPage: payload.currentPage,
					pageSize: payload.pageSize
				}
			}
		);
		return response;
	}
	public async getMidpointFactorById(payload: ParamID) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(
			`${ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_FACTORS}/${payload.id}`
		);
		return response;
	}
}
