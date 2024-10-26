import { API_PARAMS } from '@gateway/constants/apiParams.';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
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
		const response = await mainAxiosService.axios.post<CommonResponse<LoginResponse>>(ROUTE_ENDPOINTS.LOGIN, payload);

		return response;
	}

	public async register(payload: RegisterReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<RegisterResponse>>(ROUTE_ENDPOINTS.REGISTER, payload);

		return response;
	}

	public async logout(payload: LogoutReqBody) {
		const response = await mainAxiosService.axios.post(ROUTE_ENDPOINTS.LOGOUT, payload);

		return response;
	}

	public async me() {
		const response = await mainAxiosService.axios.get<CommonResponse<User>>(ROUTE_ENDPOINTS.ME);

		return response;
	}
}
