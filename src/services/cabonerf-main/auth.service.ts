import { API_PARAMS } from '@gateway/constants/apiParams';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { LoginReqBody, LogoutReqBody, RegisterReqBody } from '@gateway/types/auth.type';
import { JWTPayload } from '@gateway/types/jwt.type';

const authHeaders = (encodedJWT: JWTPayload) => {
	return {
		'x-user-id': encodedJWT.user_id,
		'x-user-role': encodedJWT.role_id,
		'x-user-active': encodedJWT.user_verify_status
	};
};

export class AuthService {
	public async health() {
		const response = await mainAxiosService.axios.get(API_PARAMS.HEALTH);

		return response;
	}

	public async login(payload: LoginReqBody) {
		const response = await mainAxiosService.axios.post(API_PARAMS.API_VERSION + API_PARAMS.USERS + API_PARAMS.LOGIN, payload);

		return response;
	}

	public async register(payload: RegisterReqBody) {
		const response = await mainAxiosService.axios.post(API_PARAMS.API_VERSION + API_PARAMS.USERS + API_PARAMS.REGISTER, payload);

		return response;
	}

	public async logout(payload: LogoutReqBody, encodedJWT: JWTPayload) {
		const response = await mainAxiosService.axios.post(API_PARAMS.API_VERSION + API_PARAMS.USERS + API_PARAMS.LOGOUT, payload, {
			headers: authHeaders(encodedJWT)
		});

		return response;
	}

	public async me(encodedJWT: JWTPayload) {
		const response = await mainAxiosService.axios.get(API_PARAMS.API_VERSION + API_PARAMS.USERS + API_PARAMS.ME, {
			headers: authHeaders(encodedJWT)
		});

		return response;
	}
}
