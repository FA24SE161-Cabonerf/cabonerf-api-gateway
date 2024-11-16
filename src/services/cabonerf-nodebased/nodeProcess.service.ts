import nodebasedAxiosService from '@gateway/services/cabonerf-nodebased/nodebased.axios';
import { EdgeProcess } from '@gateway/types/cabonerfEdge.types';
import { CommonResponse } from '@gateway/types/common.types';
import { NodeProcess } from '@gateway/types/nodeProcess.types';

export class NodeProcessService {
	public async getNodeProcessByProjectId(payload: { projectId: string }) {
		const response = await nodebasedAxiosService.axios.get<CommonResponse<NodeProcess[]>>(
			`/cabonerf-nodes?projectId=${payload.projectId}`
		);

		return response;
	}

	public async getEdgeProcessByProjectId(payload: { projectId: string }) {
		const response = await nodebasedAxiosService.axios.get<CommonResponse<EdgeProcess[]>>(
			`/cabonerf-edges?projectId=${payload.projectId}`
		);

		return response;
	}
}
