import { RemoveObjectLibraryReqBody, SearchObjectLibraryReqParams } from '@gateway/types/objectLibrary.types';
import mainAxiosService from './main.axios';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { CommonResponse } from '@gateway/types/common.types';

export default class ObjectLibraryService {
	public async searchObjectLibraryOfOrganization(orgId: string, payload: SearchObjectLibraryReqParams) {
		return mainAxiosService.axios.get(ROUTE_ENDPOINTS.OBJECT_LIBRARY + ROUTE_ENDPOINTS.ORGANIZATIONS + `/${orgId}`, {
			params: payload
		});
	}

	public async saveToObjectLibrary(projectId: string) {
		return await mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.OBJECT_LIBRARY + `/${projectId}`);
	}

	public async removeFromObjectLibrary(organizationId: string, payload: RemoveObjectLibraryReqBody) {
		return await mainAxiosService.axios.delete<CommonResponse<any>>(
			ROUTE_ENDPOINTS.OBJECT_LIBRARY + ROUTE_ENDPOINTS.ORGANIZATIONS + `/${organizationId}`,
			{
				data: payload
			}
		);
	}

	public async addFromObjectLibraryToProject(processId: string, projectId: string) {
		return await mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.OBJECT_LIBRARY + `/${processId}` + ROUTE_ENDPOINTS.PROJECTS + `/${projectId}`
		);
	}
}
