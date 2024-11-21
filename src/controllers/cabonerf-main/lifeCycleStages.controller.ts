import LifeCycleStagesService from '@gateway/services/cabonerf-main/lifeCycleStages.service';
import { ParamID } from '@gateway/types/common.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { BaseLifeCycleStagesReqBody } from '@gateway/types/lifeCycleStage.types';

export class LifeCycleStagesController {
	public async getAllLifeCycleStages(_req: Request, res: Response) {
		const result = await LifeCycleStagesService.prototype.getAllLifeCycleStages();

		return res.status(result.status).json(result.data);
	}
	public async createLifeCycleStages(_req: Request<ParamsDictionary, unknown, any, BaseLifeCycleStagesReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await LifeCycleStagesService.prototype.createLifeCycleStages(rest);
		return res.status(result.status).json(result.data);
	}
	public async updateLifeCycleStages(_req: Request<ParamsDictionary, unknown, any, BaseLifeCycleStagesReqBody>, res: Response) {
		const { id } = _req.params;
		const { ...rest } = _req.body;
		const result = await LifeCycleStagesService.prototype.updateLifeCycleStages(id, rest);
		return res.status(result.status).json(result.data);
	}
	public async deleteLifeCycleStages(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await LifeCycleStagesService.prototype.deleteLifeCycleStages(id);

		return res.status(result.status).json(result.data);
	}
}
