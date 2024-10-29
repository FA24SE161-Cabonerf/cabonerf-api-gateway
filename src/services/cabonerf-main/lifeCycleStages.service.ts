import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';

class LifeCycleStagesService {
	public async getAllLifeCycleStages() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.LIFE_CYCLE_STAGES);

		return response;
	}
}

export default LifeCycleStagesService;
