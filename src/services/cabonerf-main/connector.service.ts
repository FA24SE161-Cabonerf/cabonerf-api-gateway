import { CreateConnectorReqBody } from '@gateway/types/connector.types';
import mainAxiosService from './main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';

export default class ConnectorService {
	public async createConnector(payload: CreateConnectorReqBody) {
		const response = mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.CONNECTOR, payload);
		return response;
	}
}
