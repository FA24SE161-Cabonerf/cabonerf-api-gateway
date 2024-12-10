import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { IndustryCode } from '@gateway/types/industryCode.types';

export class IndsutryCodeService {
	public async getListIndustryCodeByOrganizationId(payload: { orgId: string }) {
		const result = await mainAxiosService.axios.get<CommonResponse<IndustryCode[]>>(`${ROUTE_ENDPOINTS.INDUSTRY}/${payload.orgId}`);

		return result;
	}

	public async createIndustryCodeByManager(payload: { name: string; code: string }) {
		const result = await mainAxiosService.axios.post<
			CommonResponse<{
				id: string;
				code: string;
				name: string;
			}>
		>(`${ROUTE_ENDPOINTS.INDUSTRY}${ROUTE_ENDPOINTS.MANAGER}`, payload);

		return result;
	}

	public async deleteIndustryCodeByManager(payload: { id: string }) {
		const result = await mainAxiosService.axios.delete<
			CommonResponse<{
				id: string;
				code: string;
				name: string;
			}>
		>(`${ROUTE_ENDPOINTS.INDUSTRY}${ROUTE_ENDPOINTS.MANAGER}/${payload.id}`);

		return result;
	}

	public async getAllIndustryCodeByManager(payload: any) {
		const result = await mainAxiosService.axios.get<
			CommonResponse<{ pageCurrent: number; pageSize: number; totalPage: number; industryCodes: IndustryCode[] }>
		>(`${ROUTE_ENDPOINTS.INDUSTRY}${ROUTE_ENDPOINTS.MANAGER}`, {
			params: {
				...payload
			}
		});

		return result;
	}
}
