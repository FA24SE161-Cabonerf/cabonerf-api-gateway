import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { GetIndustryCodeReqQuery, IndustryCode } from '@gateway/types/industryCode.types';

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
		>(`${ROUTE_ENDPOINTS.MANAGER}${ROUTE_ENDPOINTS.INDUSTRY}`, payload);

		return result;
	}

	public async deleteIndustryCodeByManager(payload: { id: string }) {
		const result = await mainAxiosService.axios.delete<
			CommonResponse<{
				id: string;
				code: string;
				name: string;
			}>
		>(`${ROUTE_ENDPOINTS.MANAGER}${ROUTE_ENDPOINTS.INDUSTRY}/${payload.id}`);

		return result;
	}

	public async getAllIndustryCodeByManager(payload: GetIndustryCodeReqQuery) {
		console.log('38', payload);
		const result = await mainAxiosService.axios.get<
			CommonResponse<{ pageCurrent: number; pageSize: number; totalPage: number; industryCodes: IndustryCode[] }>
		>(`${ROUTE_ENDPOINTS.MANAGER}${ROUTE_ENDPOINTS.INDUSTRY}`, {
			params: {
				pageCurrent: payload.currentPage,
				pageSize: payload.pageSize,
				keyword: payload.keyword
			}
		});

		return result;
	}
}
