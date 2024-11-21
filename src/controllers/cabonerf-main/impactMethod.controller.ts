import { ImpactMethodService as ImpactMethodService } from '@gateway/services/cabonerf-main/impactMethod.service';
import { ParamID } from '@gateway/types/common.types';
import { BaseImpactMethodReqBody } from '@gateway/types/impactMethod.types';
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

	public async createImpactMethod(_req: Request<ParamsDictionary, unknown, BaseImpactMethodReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await ImpactMethodService.prototype.createImpactMethod(rest);

		return res.status(result.status).json(result.data);
	}

	public async updateImpactMethodById(_req: Request<ParamsDictionary, unknown, BaseImpactMethodReqBody>, res: Response) {
		const { id } = _req.params;
		const { ...rest } = _req.body;
		const result = await ImpactMethodService.prototype.updateImpactMethodById(id, rest);
		return res.status(result.status).json(result.data);
	}

	public async deleteImpactMethodById(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await ImpactMethodService.prototype.deleteImpactMethodById(id);
		return res.status(result.status).json(result.data);
	}

	public async addCategoryToMethod(_req: Request, res: Response) {
		const { methodId, categoryId } = _req.params;
		const result = await ImpactMethodService.prototype.addCategoryToMethod(methodId, categoryId);
		return res.status(result.status).json(result.data);
	}

	public async getAllMethodName(_req: Request, res: Response) {
		const result = await ImpactMethodService.prototype.getAllMethodName();
		return res.status(result.status).json(result.data);
	}
}
