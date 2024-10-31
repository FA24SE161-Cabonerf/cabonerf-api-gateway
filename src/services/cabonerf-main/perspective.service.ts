import { CommonResponse } from '@gateway/types/common.types';
import mainAxiosService from './main.axios';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { BasePerspectiveReqBody } from '@gateway/types/perspective.types';

export class PerspectiveService {
	public async getAllPerspectives() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.PERSPECTIVES + '/');
		return response;
	}

	public async getPerspectiveById(id: string) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.PERSPECTIVES + `/${id}`);
		return response;
	}

	public async createPerspective(payload: BasePerspectiveReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.PERSPECTIVES, payload);
		return response;
	}

	public async updatePerspectiveById(id: string, payload: BasePerspectiveReqBody) {
		const response = await mainAxiosService.axios.put<CommonResponse<any>>(ROUTE_ENDPOINTS.PERSPECTIVES + `/${id}`, payload);
		return response;
	}

	public async deletePerspectiveById(id: string) {
		const response = await mainAxiosService.axios.delete<CommonResponse<any>>(ROUTE_ENDPOINTS.PERSPECTIVES + `/${id}`);
		return response;
	}
}
