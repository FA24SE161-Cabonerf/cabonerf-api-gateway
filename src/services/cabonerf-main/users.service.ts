import { CommonResponse } from '@gateway/types/common.types';
import mainAxiosService from './main.axios';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { PagingRequestParams } from '@gateway/types/users.types';

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
}
