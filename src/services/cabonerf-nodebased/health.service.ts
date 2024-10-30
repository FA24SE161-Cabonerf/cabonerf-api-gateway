import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import nodebasedAxiosService from '@gateway/services/cabonerf-nodebased/nodebased.axios';

export class HealthNodebasedService {
	public async checkHealth() {
		const response = await nodebasedAxiosService.axios.get(ROUTE_ENDPOINTS.NODEBASED_HEALTH);

		return response;
	}
}
