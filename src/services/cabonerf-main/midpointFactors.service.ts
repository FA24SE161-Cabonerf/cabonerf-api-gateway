import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { CommonResponse, ParamID } from '@gateway/types/common.types';
import { CreateFactorReqBody, ExportFactorReqQuery, GetMidpointSubstanceFactorsAdminReqParams } from '@gateway/types/midpointFactor.types';
import FormData from 'form-data';

export class MidpointFactorService {
	public async getAllMidpointFactors() {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_FACTORS);
		return response;
	}

	public async getAllMidpointFactorsForAdmin(payload: GetMidpointSubstanceFactorsAdminReqParams) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.MIDPOINT_FACTORS,
			{
				params: payload
			}
		);
		return response;
	}

	public async getMidpointFactorById(payload: ParamID) {
		const response = await mainAxiosService.axios.get<CommonResponse<any>>(
			`${ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_FACTORS}/${payload.id}`
		);
		return response;
	}

	public async createMidpointFactor(payload: CreateFactorReqBody) {
		const response = await mainAxiosService.axios.post<CommonResponse<any>>(ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN, payload);
		return response;
	}

	public async deleteMidpointFactor(id: string) {
		const response = await mainAxiosService.axios.delete<CommonResponse<any>>(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.MIDPOINT_FACTORS + `${id}`
		);
		return response;
	}

	public async downloadFileLog(fileName: string) {
		const response = await mainAxiosService.axios.get(
			`${ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.DOWNLOAD_ERROR_LOG_MIDPOINT_FACTORS}`,
			{
				params: { fileName },
				responseType: 'stream'
			}
		);

		return response;
	}

	public async downloadFactorTemplate() {
		const response = await mainAxiosService.axios.get(
			`${ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.DOWNLOAD_TEMPLATE_MIDPOINT_FACTORS}`,
			{
				responseType: 'stream'
			}
		);
		return response;
	}

	public async importExcel(file: Buffer, methodName: string) {
		const formData = new FormData();
		formData.append('file', file, { filename: 'import.xlsx' });
		formData.append('methodName', methodName);

		const response = await mainAxiosService.axios.post<CommonResponse<any>>(
			`${ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.IMPORT_MIDPOINT_FACTORS}`,
			formData,
			{
				headers: {
					...formData.getHeaders()
				}
			}
		);
		return response;
	}

	public async exportFactor(payload: ExportFactorReqQuery) {
		console.log('category', payload.impactCategoryId);
		console.log('method', payload.methodId);

		const response = await mainAxiosService.axios.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.EXPORT_MIDPOINT_FACTORS,
			{
				params: {
					methodId: payload.methodId,
					impactCategoryId: payload.impactCategoryId
				},
				responseType: 'stream'
			}
		);
		return response;
	}
}
