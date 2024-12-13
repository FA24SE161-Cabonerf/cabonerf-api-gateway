import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from './main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import FormData from 'form-data';
import {
	AcceptInviteReqQuery,
	CreateOrganizationReqParams,
	GetAllForManagerReqParams,
	InviteUserToOrganizationReqBody
} from '@gateway/types/organization.types';
import mime from 'mime-types';

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
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.MANAGER + ROUTE_ENDPOINTS.ORGANIZATIONS, {
			params: {
				pageCurrent: payload.pageCurrent,
				pageSize: payload.pageSize,
				keyword: payload.keyword
			}
		});
	}

	public async deleteOrganizationForManager(id: string) {
		return mainAxiosService.axios.delete<CommonResponse<any>>(ROUTE_ENDPOINTS.MANAGER + ROUTE_ENDPOINTS.ORGANIZATIONS + `/${id}`);
	}

	public async inviteMember(payload: InviteUserToOrganizationReqBody) {
		return mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.ORGANIZATION_MANAGER + ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.INVITE_MEMBER,
			payload
		);
	}

	public async acceptInvite(payload: AcceptInviteReqQuery) {
		return mainAxiosService.axios.put<CommonResponse<any>>(
			ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.ACCEPT_INVITE,
			{},
			{
				params: payload
			}
		);
	}

	public async removeMember(id: string) {
		return mainAxiosService.axios.delete<CommonResponse<any>>(
			ROUTE_ENDPOINTS.ORGANIZATION_MANAGER + ROUTE_ENDPOINTS.ORGANIZATIONS + `/${id}`
		);
	}

	public async createOrganization(data: CreateOrganizationReqParams, contractFile: Express.Multer.File, logo: Express.Multer.File) {
		const formData = new FormData();

		formData.append('logo', logo.buffer, {
			filename: logo.originalname,
			contentType: mime.contentType(logo.originalname) || 'image/png'
		});

		formData.append('contractFile', contractFile.buffer, {
			filename: contractFile.originalname,
			contentType: mime.contentType(contractFile.originalname) || 'application/pdf'
		});

		formData.append('name', data.name);
		formData.append('email', data.email);
		formData.append('description', data.description);
		formData.append('taxCode', data.taxCode);
		formData.append('industryCodeIds', data.industryCodeIds);

		return mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.MANAGER + ROUTE_ENDPOINTS.ORGANIZATIONS, formData, {
			headers: { ...formData.getHeaders() }
		});
	}

	public async leaveOrganization(userOrganizationId: string) {
		return await mainAxiosService.axios.delete<CommonResponse<any>>(
			ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.LEAVE_ORGANIZATION + `/${userOrganizationId}`
		);
	}
}
