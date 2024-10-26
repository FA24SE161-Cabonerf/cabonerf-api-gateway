import ProjectService from '@gateway/services/cabonerf-main/project.service';
import { ParamID } from '@gateway/types/common.types';
import { CreateProjectReqBody, UpdateProjectReqBody } from '@gateway/types/project.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';
export class ProjectController {
	public async getAllProjects(_req: Request, res: Response) {
		const result = await ProjectService.prototype.getProject();

		return res.status(result.status).json(result.data);
	}

	public async getProjectByID(req: Request<ParamID, unknown, unknown>, res: Response) {
		const { id } = req.params;

		const result = await ProjectService.prototype.getProjectByID({ id });

		return res.status(result.status).json(result.data);
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
}
