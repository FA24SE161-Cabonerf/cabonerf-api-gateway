import ProjectService from '@gateway/services/cabonerf-main/project.service';
import { GatewayResponse } from '@gateway/types/common.types';
import { Request, Response } from 'express';

export class ProjectController {
	public async getProjects(_req: Request, res: Response) {
		const result = await ProjectService.prototype.getProject();

		const response = new GatewayResponse({ status: result.status, message: result.data.message, data: result.data.data });

		return res.status(response.status).json(response);
	}
}
