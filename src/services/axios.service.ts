import config from '@gateway/config';
import { winstonLogger } from '@gateway/winston';
import axios, { AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'Gateway', 'debug');
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

		// Add interceptors for request and response
		this.addInterceptors();
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

	// Add interceptors to the axios instance
	private addInterceptors() {
		// Request interceptor
		this.axios.interceptors.request.use(
			(config: any) => {
				// Log the request details before sending the request
				log.info('Request:', {
					url: config.url,
					method: config.method,
					headers: config.headers,
					data: config.data
				});

				return config; // Continue the request
			},
			(error) => {
				// Log the error in the request if it fails
				console.error('Request Error:', error);
				return Promise.reject(error);
			}
		);

		// Response interceptor
		this.axios.interceptors.response.use(
			(response: AxiosResponse) => {
				// Log the response details
				console.log('Response:', {
					status: response.status,
					data: response.data,
					headers: response.headers
				});
				return response; // Return the response
			},
			(error) => {
				// Log the error if the response fails
				console.error('Response Error:', error.response?.status, error.response?.data);
				return Promise.reject(error);
			}
		);
	}
}
