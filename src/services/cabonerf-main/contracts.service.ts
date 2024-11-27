import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from './main.axios';

export default class ContractService {
	public async downloadContract(id: string) {
		return mainAxiosService.axios.get(ROUTE_ENDPOINTS.CONTRACTS + `/${id}`, {
			responseType: 'stream'
		});
	}
}
