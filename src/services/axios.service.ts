import config from '@gateway/config';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'Gateway', 'debug');
export class AxiosService {
	public axios: ReturnType<typeof axios.create>;

	/**
	 *
	 * @param baseUrl ex: http://localhost:8080/
	 * @param serviceIDKey key to ensure traffic from gateway
	 * @returns AxiosInstance
	 */
	constructor(baseUrl: string, serviceIDKey: string) {
		this.axios = this.axiosCreateInstance(baseUrl, serviceIDKey);

		this.axios.interceptors.request.use(
			(config: any) => {
				// Log headers ở đây để kiểm tra

				// Trả về config đã chỉnh sửa hoặc không
				return config;
			},
			(error) => {
				// Xử lý lỗi trước khi request được gửi đi
				return Promise.reject(error);
			}
		);
	}

	public axiosCreateInstance(baseUrl: string, serviceIDKey?: string): ReturnType<typeof axios.create> {
		let requestGatewayToken = '';

		if (serviceIDKey) {
			requestGatewayToken = jwt.sign({ id: serviceIDKey }, config.GATEWAY_SERVICE_SECRET_KEY);
		}

		const instance: ReturnType<typeof axios.create> = axios.create({
			baseURL: baseUrl,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				gatewayToken: requestGatewayToken
			},
			withCredentials: true
		});

		return instance;
	}
}
