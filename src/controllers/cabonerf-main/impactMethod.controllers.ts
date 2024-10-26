import { ImpactService as ImpactMethodService } from '@gateway/services/cabonerf-main/impactMethod.service';
import { CreateImpactMethodReqBody } from '@gateway/types/impactMethod.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';

export default class ImpactMethodController {
	public async getImpactMethods(_req: Request, res: Response) {
		const result = await ImpactMethodService.prototype.getImpactMethods();

		return res.status(result.status).json(result.data);
	}

	public async getImpactMethodById(_req: Request, res: Response) {
		const id = _req.params.id;

		const result = await ImpactMethodService.prototype.getImpactMethodById({ id });
		return res.status(result.status).json(result.data);
	}

	public async createImpactMethod(_req: Request<ParamsDictionary, unknown, CreateImpactMethodReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await ImpactMethodService.prototype.createImpactMethod(rest);

		return res.status(result.status).json(result.data);
	}
}
