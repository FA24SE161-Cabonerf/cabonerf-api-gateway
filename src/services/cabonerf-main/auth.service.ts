import { API_PARAMS } from '@gateway/constants/apiParams';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { LoginReqBody, LoginResponse, LogoutReqBody, RegisterReqBody, RegisterResponse } from '@gateway/types/auth.type';
import { CommonResponse } from '@gateway/types/common.types';
import { JWTPayload } from '@gateway/types/jwt.type';

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

	public async register(payload: RegisterReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<RegisterResponse>>(
			API_PARAMS.API_VERSION + API_PARAMS.USERS + API_PARAMS.REGISTER,
			payload
		);

		return response;
	}

	public async logout(payload: LogoutReqBody, encodedJWT: JWTPayload) {
		const response = await mainAxiosService.axios.post<CommonResponse<string>>(
			API_PARAMS.API_VERSION + API_PARAMS.USERS + API_PARAMS.REGISTER,
			payload,
			{
				headers: {
					'x-user-id': encodedJWT.user_id,
					'x-user-role': encodedJWT.role_id,
					'x-user-active': encodedJWT.user_verify_status
				}
			}
		);

		return response;
	}
}
