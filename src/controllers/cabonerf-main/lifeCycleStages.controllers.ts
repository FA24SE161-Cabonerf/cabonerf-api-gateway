import LifeCycleStagesService from '@gateway/services/cabonerf-main/lifeCycleStages.service';
import { Request, Response } from 'express';

export class LifeCycleStagesController {
	public async getAllLifeCycleStages(_req: Request, res: Response) {
		const result = await LifeCycleStagesService.prototype.getAllLifeCycleStages();

		return res.status(result.status).json(result.data);
	}
}
