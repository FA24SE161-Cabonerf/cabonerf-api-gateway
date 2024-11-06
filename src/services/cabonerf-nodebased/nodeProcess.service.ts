import nodebasedAxiosService from '@gateway/services/cabonerf-nodebased/nodebased.axios';
import { CommonResponse } from '@gateway/types/common.types';
import { NodeProcess } from '@gateway/types/nodeProcess.types';

export class NodeProcessService {
	public async getNodeProcessByProjectId(payload: { projectId: string }) {
		const response = await nodebasedAxiosService.axios.get<CommonResponse<NodeProcess[]>>(`/cabonerf-nodes/${payload.projectId}`);

		return response;
	}
}
