import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';

class EmissionCompartmentService {
	public async getListEmissionCompartment() {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.EMISSIONS + ROUTE_ENDPOINTS.EMISSION_COMPARTMENT);
	}
}

export default EmissionCompartmentService;
