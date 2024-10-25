import { API_PARAMS } from '@gateway/constants/apiParams.';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';

export default class ProjectService {
	public async getProject() {
		const response = await mainAxiosService.axios.get(API_PARAMS.PROJECTS);

		return response;
	}
}
