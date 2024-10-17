import config from '@gateway/config';
import { API_PARAMS } from '@gateway/constants/apiParams';
import { AxiosService } from '@gateway/services/axios.service';
import { LoginReqBody, LoginResponse } from '@gateway/types/auth.type';
import { CommonResponse } from '@gateway/types/common.types';

export class MainService {
	private axiosService: AxiosService;

	constructor() {
		this.axiosService = new AxiosService(config.MAIN_SERVICE_URL, config.MAIN_SERVICE_ID_KEY);
	}

	public async health() {
		const response = await this.axiosService.axios.get<string>(API_PARAMS.HEALTH);

		return response;
	}

	public async login(payload: LoginReqBody) {
		const response = await this.axiosService.axios.post<CommonResponse<LoginResponse>>(API_PARAMS.LOGIN, payload);

		return response;
	}
}
