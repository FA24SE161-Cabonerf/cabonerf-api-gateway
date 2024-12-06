import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from './main.axios';

export default class SystemBoundaryService {
	public async getAllSystemBoundary() {
		return mainAxiosService.axios.get(ROUTE_ENDPOINTS.SYSTEM_BOUNDARY);
	}
}
