import { CreateElementaryExchangeReqBody, CreateProductExchangeReqBody, SearchElementaryQuery } from '@gateway/types/exchange.types';
import mainAxiosService from './main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';

export default class ExchangeService {
	public async createProductExchange(payload: CreateProductExchangeReqBody) {
		const response = mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.EXCHANGES + ROUTE_ENDPOINTS.PRODUCT_EXCHANGE,
			payload
		);
		return response;
	}

	public async createElementaryExchange(payload: CreateElementaryExchangeReqBody) {
		const response = mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.EXCHANGES + ROUTE_ENDPOINTS.ELEMENTARY_EXCHANGE,
			payload
		);
		return response;
	}

	public async getAllEmissionSubstances(payload: SearchElementaryQuery) {
		const response = mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.EMISSION_SUBSTANCE, {
			params: {
				...payload,
				pageCurrent: Number(payload.pageCurrent),
				pageSize: Number(payload.pageSize),
				methodId: payload.methodId
			}
		});
		return response;
	}
}
