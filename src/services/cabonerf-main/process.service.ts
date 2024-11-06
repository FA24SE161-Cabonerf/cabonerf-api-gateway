import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';

export default class ProcessService {
	// public async getProject() {
	// 	const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.);

	// 	return response;
	// }

	public async getProcessById(id: string) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(`${ROUTE_ENDPOINTS.PROCESS}/${id}`);

		return response;
	}

	public async createProcess(payload: any) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.PROCESS, payload);

		return response;
	}

	// public async updateProject(payload: { id: string; data: UpdateProjectReqBody }) {
	// 	const response = await mainAxiosService.axios.put<CommonResponse<any>>(`${ROUTE_ENDPOINTS.}/${payload.id}`, payload.data);

	// 	return response;
	// }

	public async deleteProcess(id: string) {
		const response = await mainAxiosService.axios.delete<CommonResponse<any>>(`${ROUTE_ENDPOINTS.PROCESS}/${id}`);

		return response;
	}
}
