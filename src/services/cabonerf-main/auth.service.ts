import { API_PARAMS } from '@gateway/constants/apiParams';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { LoginReqBody, LoginResponse } from '@gateway/types/auth.type';
import { CommonResponse } from '@gateway/types/common.types';

export class AuthService {
	public async health() {
		const response = await mainAxiosService.axios.get(API_PARAMS.HEALTH);

		return response;
	}

	public async login(payload: LoginReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<LoginResponse>>(
			API_PARAMS.API_VERSION + API_PARAMS.USERS + API_PARAMS.LOGIN,
			payload
		);

		return response;
	}
}
