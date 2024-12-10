import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from './main.axios';
import { PaginationKeywordRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

export default class DatasetService {
	public async getAllDataset(projectId: string) {
		return mainAxiosService.axios.get(ROUTE_ENDPOINTS.DATASETS, {
			params: {
				projectId: projectId
			}
		});
	}
	public async getAllDatasetByAdmin(payload: PaginationKeywordRequest) {
		return mainAxiosService.axios.get(ROUTE_ENDPOINTS.DATASETS + ROUTE_ENDPOINTS.ADMIN, {
			params: payload
		});
	}
}
