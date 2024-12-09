import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from './main.axios';

export default class DatasetService {
	public async getAllDataset(projectId: string) {
		return mainAxiosService.axios.get(ROUTE_ENDPOINTS.DATASETS, {
			params: {
				projectId: projectId
			}
		});
	}
}
