import ProjectService from '@gateway/services/cabonerf-main/project.service';
import { NodeProcessService } from '@gateway/services/cabonerf-nodebased/nodeProcess.service';
import { GatewayResponse, ParamID } from '@gateway/types/common.types';
import { CreateProjectReqBody, UpdateProjectReqBody } from '@gateway/types/project.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';
export class ProjectController {
	public async getAllProjects(_req: Request, res: Response) {
		const result = await ProjectService.prototype.getProject();

		return res.status(result.status).json(result.data);
	}

	public async getProjectByID(req: Request<ParamID & { wid: string }, unknown, unknown>, res: Response) {
		const { id, wid } = req.params;

		const [mainData, cabonerfNodeData, cabonerfEdgeData] = await Promise.all([
			ProjectService.prototype.getProjectByID({ id, wid }),
			NodeProcessService.prototype.getNodeProcessByProjectId({ projectId: id }),
			NodeProcessService.prototype.getEdgeProcessByProjectId({ projectId: id })
		]);

		const mainDataProcessesMap = new Map(mainData.data.data.processes.map((item) => [item.id, item]));
		const mainDataEdgeMap = new Map(mainData.data.data.connectors.map((item) => [item.id, item]));

		// Merge node process
		const _processes = cabonerfNodeData.data.data
			.map((node) => {
				const findedData = mainDataProcessesMap.get(node.id);

				if (findedData) {
					return {
						...node,
						data: {
							...node.data,
							description: findedData.description,
							name: findedData.name,
							lifeCycleStage: findedData.lifeCycleStage,
							overallProductFlowRequired: findedData.overallProductFlowRequired,
							impacts: findedData.impacts,
							exchanges: findedData.exchanges
						}
					};
				}
			})
			.filter(Boolean);

		// Merge connector & edge
		const _edges = cabonerfEdgeData.data.data
			.map((edge) => {
				const findedData = mainDataEdgeMap.get(edge.id);

				if (findedData) {
					return {
						...edge,
						data: {
							...edge.data
						}
					};
				}
			})
			.filter(Boolean);

		const project = {
			...mainData.data.data,
			processes: _processes,
			connectors: _edges
		};

		const gatewayResponse = new GatewayResponse({ status: 'Success', message: 'Get success', data: project });

		return res.status(mainData.status).json(gatewayResponse);
	}

	public async createProject(req: Request<ParamsDictionary, any, CreateProjectReqBody>, res: Response) {
		const result = await ProjectService.prototype.createProject(req.body);

		return res.status(result.status).json(result.data);
	}

	public async updateProject(req: Request<ParamID, any, UpdateProjectReqBody>, res: Response) {
		const { id } = req.params;
		const data = req.body;

		const result = await ProjectService.prototype.updateProject({ id, data });

		return res.status(result.status).json(result.data);
	}

	public async deleteProjectByID(req: Request<ParamID, unknown, unknown>, res: Response) {
		const { id } = req.params;

		const result = await ProjectService.prototype.deleteProject({ id });

		return res.status(result.status).json(result.data);
	}

	public async changeProjectMethod(_req: Request, res: Response) {
		const { projectId, methodId } = _req.params;
		const result = await ProjectService.prototype.changeProjectMethod(projectId, methodId);
		return res.status(result.status).json(result.data);
	}
}
