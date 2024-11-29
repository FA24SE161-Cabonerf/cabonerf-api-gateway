import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from './main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import FormData from 'form-data';
import { GetAllForManagerReqParams } from '@gateway/types/organization.types';

export default class OrganizationService {
	public async getUserOrganization() {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS);
	}

	public async getOrganizationById(id: string) {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS + `/${id}`);
	}

	public async getMembersInOrganization(id: string) {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS + `/${id}` + ROUTE_ENDPOINTS.MEMBERS);
	}

	public async getListMemberInvited() {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.INVITED_LIST);
	}

	public async uploadLogo(id: string, logo: Buffer) {
		const formData = new FormData();
		formData.append('logo', logo, {
			filename: 'logo.png',
			contentType: 'image/png'
		});
		return mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.ORGANIZATIONS + `/${id}` + ROUTE_ENDPOINTS.UPLOAD_LOGO,
			formData,
			{
				headers: {
					...formData.getHeaders()
				}
			}
		);
	}

	public async getAllForManager(payload: GetAllForManagerReqParams) {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.MANAGER, {
			params: payload
		});
	}

	public async deleteOrganizationForManager(id: string) {
		return mainAxiosService.axios.delete<CommonResponse<any>>(ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.MANAGER + `/${id}`);
	}
}
