import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from './main.axios';
import { CommonResponse } from '@gateway/types/common.types';

export default class OrganizationService {
	public async getUserOrganization() {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS);
	}

	public async getAllByOrganization(id: string) {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS + `${id}`);
	}

	public async getMembersInOrganization(id: string) {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS + `${id}` + ROUTE_ENDPOINTS.MEMBERS);
	}

	public async getListMemberInvited() {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.INVITED_LIST);
	}
}
