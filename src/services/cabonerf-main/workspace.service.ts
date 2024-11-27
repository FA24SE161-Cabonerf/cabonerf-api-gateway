import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from './main.axios';
import { CommonResponse } from '@gateway/types/common.types';

export default class WorkspaceService {
	public async getUserWorkspace() {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.WORKSPACE);
	}
}
