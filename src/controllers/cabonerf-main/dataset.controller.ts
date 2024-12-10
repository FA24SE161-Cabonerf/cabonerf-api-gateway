import { PaginationKeywordRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';
import DatasetService from '@gateway/services/cabonerf-main/dataset.service';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';

export default class DatasetController {
	public async getAllDataset(_req: Request<ParamsDictionary, unknown, unknown, { projectId: string }>, res: Response) {
		const { projectId } = _req.query;
		const result = await DatasetService.prototype.getAllDataset(projectId);
		return res.status(result.status).json(result.data);
	}
	public async getAllDatasetByAdmin(_req: Request<ParamsDictionary, unknown, unknown, PaginationKeywordRequest>, res: Response) {
		const request = _req.query;
		const result = await DatasetService.prototype.getAllDatasetByAdmin(request);
		return res.status(result.status).json(result.data);
	}
}
