import { CommonResponse } from '@gateway/types/common.types';
import mainAxiosService from './main.axios';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { GetEmissionSubstanceReqParams } from '@gateway/types/emissionSubstance.types';

export default class EmissionSubstanceService {
	public async getEmissionSubstance(payload: GetEmissionSubstanceReqParams) {
		return mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.EMISSION_SUBSTANCE + ROUTE_ENDPOINTS.ADMIN, {
			params: payload
		});
	}
}
