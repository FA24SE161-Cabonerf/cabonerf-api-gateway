import { CommonResponse } from '@gateway/types/common.types';
import mainAxiosService from './main.axios';
import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { CreateUnitReqBody, UpdateUnitReqBody } from '@gateway/types/unit.types';

export class UnitService {
	public async getAllUnits() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.UNITS);
		return response;
	}

	public async getUnitById(id: string) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.UNITS + `/${id}`);
		return response;
	}

	public async getAllUnitsInUnitGroup(groupId: string) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(
			ROUTE_ENDPOINTS.UNIT_GROUPS + `/${groupId}` + ROUTE_ENDPOINTS.UNITS
		);
		return response;
	}

	public async createUnitInUnitGroup(groupId: string, payload: CreateUnitReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(
			ROUTE_ENDPOINTS.UNIT_GROUPS + `/${groupId}` + ROUTE_ENDPOINTS.UNITS,
			payload
		);
		return response;
	}

	public async updateUnitById(id: string, payload: UpdateUnitReqBody) {
		const response = await mainAxiosService.axios.put<CommonResponse<any>>(ROUTE_ENDPOINTS.UNITS + `/${id}`, payload);
		return response;
	}

	public async deleteUnitById(id: string) {
		const response = await mainAxiosService.axios.delete<CommonResponse<any>>(ROUTE_ENDPOINTS.UNITS + `/${id}`);
		return response;
	}
}
