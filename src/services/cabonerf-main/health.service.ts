import { API_PARAMS } from '@gateway/constants/apiParams.';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';

export class HealthService {
	public async health() {
		const response = await mainAxiosService.axios.get(API_PARAMS.HEALTH);

		return response;
	}

	public async testCreateProcessQueue(msg: string) {
		const response = await mainAxiosService.axios.post('/test-create-process-queue', msg);
		return response;
	}
}
