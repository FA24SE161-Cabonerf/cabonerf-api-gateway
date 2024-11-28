import { CommonResponse } from '@gateway/types/common.types';
import mainAxiosService from './main.axios';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { PagingRequestParams, UpdateUserProfileReqBody } from '@gateway/types/users.types';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';
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

		const fileType = await fileTypeFromBuffer(image);

		if (!fileType) {
			throw new Error('Unsupported file type'); // Handle unsupported formats
		}

		const { mime, ext } = fileType;

		formData.append('image', image, {
			filename: `avatar.${ext}`, // Give the file a name
			contentType: mime // Specify the file type
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
}
