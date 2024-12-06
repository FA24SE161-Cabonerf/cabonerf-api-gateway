import { SearchObjectLibraryReqParams } from '@gateway/types/objectLibrary.types';
import mainAxiosService from './main.axios';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { CommonResponse } from '@gateway/types/common.types';

export default class ObjectLibraryService {
	public async searchObjectLibraryOfOrganization(id: string, payload: SearchObjectLibraryReqParams) {
		return mainAxiosService.axios.get(ROUTE_ENDPOINTS.OBJECT_LIBRARY + ROUTE_ENDPOINTS.ORGANIZATIONS + `/${id}`, {
			params: payload
		});
	}

	public async saveToObjectLibrary(id: string) {
		return await mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.OBJECT_LIBRARY + `/${id}`);
	}

	public async removeFromObjectLibrary(id: string) {
		return await mainAxiosService.axios.delete<CommonResponse<any>>(ROUTE_ENDPOINTS.OBJECT_LIBRARY + `/${id}`);
	}

	public async addFromObjectLibraryToProject(processId: string, projectId: string) {
		return await mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.OBJECT_LIBRARY + `/${processId}` + ROUTE_ENDPOINTS.PROJECTS + `/${projectId}`
		);
	}
}
