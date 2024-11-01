import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { CreateProjectReqBody, UpdateProjectReqBody } from '@gateway/types/project.types';

export default class ProjectService {
	public async getProject() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.PROJECTS);

		return response;
	}

	public async getProjectByID(payload: { id: string }) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(`${ROUTE_ENDPOINTS.PROJECTS}/${payload.id}`);

		return response;
	}

	public async createProject(payload: CreateProjectReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.PROJECTS, payload);

		return response;
	}

	public async updateProject(payload: { id: string; data: UpdateProjectReqBody }) {
		const response = await mainAxiosService.axios.put<CommonResponse<any>>(`${ROUTE_ENDPOINTS.PROJECTS}/${payload.id}`, payload.data);

		return response;
	}

	public async deleteProject(payload: { id: string }) {
		const response = await mainAxiosService.axios.delete<CommonResponse<any>>(`${ROUTE_ENDPOINTS.PROJECTS}/${payload.id}`);

		return response;
	}
}
