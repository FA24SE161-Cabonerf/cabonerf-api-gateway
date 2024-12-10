import { CommonResponse } from '@gateway/types/common.types';
import mainAxiosService from './main.axios';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { PagingRequestParams, UpdateUserProfileReqBody } from '@gateway/types/users.types';
import FormData from 'form-data';
import { PaginationKeywordRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';
export class UsersService {
	public async getAllUsersForAdmin(payload: PagingRequestParams) {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.ADMIN, {
			params: {
				...payload,
				pageCurrent: Number(payload.pageCurrent),
				pageSize: Number(payload.pageSize)
			}
		});
	}

	public async updateUserStatus(id: string) {
		return mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.BAN_UNBAN + `/${id}`
		);
	}

	public async updateUserProfile(payload: UpdateUserProfileReqBody) {
		return mainAxiosService.axios.put<CommonResponse<any>>(ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.PROFILE, payload);
	}

	public async updateUserAvatar(image: Buffer) {
		const formData = new FormData();

		formData.append('image', image, {
			filename: `avatar.png`, // Give the file a name
			contentType: 'image/png' // Specify the file type
		});

		const response = await mainAxiosService.axios.put<CommonResponse<any>>(
			`${ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.AVATAR}`,
			formData,
			{
				headers: {
					...formData.getHeaders()
				}
			}
		);
		return response;
	}

	public async getUserToInvite(payload: PaginationKeywordRequest) {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.INVITE_USER, {
			params: payload
		});
	}

	public async getUserInDashboard() {
		return mainAxiosService.axios.get<CommonResponse<any>>(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.COUNT_NEW_USER
		);
	}

	public async countAllUser() {
		return mainAxiosService.axios.get<CommonResponse<any>>(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.COUNT_ALL_USER
		);
	}
}
