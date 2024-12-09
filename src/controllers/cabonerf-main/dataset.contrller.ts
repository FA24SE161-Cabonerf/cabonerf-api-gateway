import DatasetService from '@gateway/services/cabonerf-main/dataset.service';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';

export default class DatasetController {
	public async getAllDataset(_req: Request<ParamsDictionary, unknown, unknown, { projectId: string }>, res: Response) {
		const { projectId } = _req.query;
		const result = await DatasetService.prototype.getAllDataset(projectId);
		return res.status(result.status).json(result.data);
	}
}
