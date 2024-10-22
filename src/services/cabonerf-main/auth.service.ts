import { API_PARAMS } from '@gateway/constants/apiParams.';
import { User } from '@gateway/models/cabonerf-main/user.model';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { LoginReqBody, LoginResponse, LogoutReqBody, RegisterReqBody, RegisterResponse } from '@gateway/types/auth.types';
import { CommonResponse } from '@gateway/types/common.types';

export class AuthService {
	public async health() {
		const response = await mainAxiosService.axios.get(API_PARAMS.HEALTH);

		return response;
	}

	public async login(payload: LoginReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<LoginResponse>>(API_PARAMS.USERS + API_PARAMS.LOGIN, payload);

		return response;
	}

	public async register(payload: RegisterReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<RegisterResponse>>(API_PARAMS.USERS + API_PARAMS.REGISTER, payload);

		return response;
	}

	public async logout(payload: LogoutReqBody) {
		const response = await mainAxiosService.axios.post(API_PARAMS.USERS + API_PARAMS.LOGOUT, payload);

		return response;
	}

	public async me() {
		const response = await mainAxiosService.axios.get<CommonResponse<User>>(API_PARAMS.USERS + API_PARAMS.ME);

		return response;
	}
}
