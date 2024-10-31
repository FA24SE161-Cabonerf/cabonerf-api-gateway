import { CommonResponse } from '@gateway/types/common.types';
import mainAxiosService from './main.axios';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { BaseUnitGroupReqBody } from '@gateway/types/unitGroup.types';

export default class UnitGroupService {
	public async getAllUnitGroups() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.UNIT_GROUPS);
		return response;
	}
	public async getUnitGroupById(id: string) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.UNIT_GROUPS + `/${id}`);
		return response;
	}
	public async createUnitGroup(payload: BaseUnitGroupReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.UNIT_GROUPS + '/', payload);
		return response;
	}
	public async updateUnitGroupById(id: string, payload: BaseUnitGroupReqBody) {
		const response = await mainAxiosService.axios.put<CommonResponse<any>>(ROUTE_ENDPOINTS.UNIT_GROUPS + `/${id}`, payload);
		return response;
	}
	public async deleteUnitGroupById(id: string) {
		const response = await mainAxiosService.axios.delete<CommonResponse<any>>(ROUTE_ENDPOINTS.UNIT_GROUPS + `/${id}`);
		return response;
	}
}
