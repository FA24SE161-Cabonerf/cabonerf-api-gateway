import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { BaseEmissionCompartmentReqBody } from '@gateway/types/emissionCompartment.types';

class EmissionCompartmentService {
	public async getListEmissionCompartment() {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.EMISSIONS + ROUTE_ENDPOINTS.EMISSION_COMPARTMENT);
	}

	public async createEmissionCompartment(payload: BaseEmissionCompartmentReqBody) {
		return mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.EMISSIONS + ROUTE_ENDPOINTS.EMISSION_COMPARTMENT, payload);
	}

	public async updateEmissionCompartment(id: string, payload: BaseEmissionCompartmentReqBody) {
		return mainAxiosService.axios.put<CommonResponse<any>>(
			ROUTE_ENDPOINTS.EMISSIONS + ROUTE_ENDPOINTS.EMISSION_COMPARTMENT + `/${id}`,
			payload
		);
	}

	public async deleteEmissionCompartment(id: string) {
		return mainAxiosService.axios.delete<CommonResponse<any>>(
			ROUTE_ENDPOINTS.EMISSIONS + ROUTE_ENDPOINTS.EMISSION_COMPARTMENT + `/${id}`
		);
	}
}

export default EmissionCompartmentService;
