import ProcessService from '@gateway/services/cabonerf-main/process.service';
import { ParamID } from '@gateway/types/common.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';

export class ProcessController {
	// public async getAllProjects(_req: Request, res: Response) {
	// 	const result = await ProcessService.prototype.getProject();

	// 	return res.status(result.status).json(result.data);
	// }

	public async getProcessById(req: Request<ParamID, unknown, unknown>, res: Response) {
		const { id } = req.params;

		const result = await ProcessService.prototype.getProcessById(id);

		return res.status(result.status).json(result.data);
	}

	public async createProcess(_req: Request<ParamsDictionary, any, any>, res: Response) {
		const { ...rest } = _req.body;
		const result = await ProcessService.prototype.createProcess(rest);

		return res.status(result.status).json(result.data);
	}

	// public async updateProcess(req: Request<ParamID, any, UpdateProcessReqBody>, res: Response) {
	// 	const { id } = req.params;
	// 	const data = req.body;

	// 	const result = await ProcessService.prototype.updateProcess({ id, data });

	// 	return res.status(result.status).json(result.data);
	// }

	public async deleteProcess(req: Request<ParamID, unknown, unknown>, res: Response) {
		const { id } = req.params;

		const result = await ProcessService.prototype.deleteProcess(id);

		return res.status(result.status).json(result.data);
	}
}
