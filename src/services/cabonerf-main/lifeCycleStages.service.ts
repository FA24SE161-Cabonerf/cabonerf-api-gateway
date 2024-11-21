import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { BaseLifeCycleStagesReqBody } from '@gateway/types/lifeCycleStage.types';

class LifeCycleStagesService {
	public async getAllLifeCycleStages() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.LIFE_CYCLE_STAGES);
		return response;
	}
	public async createLifeCycleStages(payload: BaseLifeCycleStagesReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.LIFE_CYCLE_STAGES, payload);
		return response;
	}
	public async updateLifeCycleStages(id: string, payload: BaseLifeCycleStagesReqBody) {
		const response = await mainAxiosService.axios.put<CommonResponse<any>>(ROUTE_ENDPOINTS.LIFE_CYCLE_STAGES + `/${id}`, payload);
		return response;
	}
	public async deleteLifeCycleStages(id: string) {
		const response = await mainAxiosService.axios.delete<CommonResponse<any>>(ROUTE_ENDPOINTS.LIFE_CYCLE_STAGES + `/${id}`);
		return response;
	}
}

export default LifeCycleStagesService;
