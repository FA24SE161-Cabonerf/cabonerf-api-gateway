import { ImpactService as ImpactMethodService } from '@gateway/services/cabonerf-main/impactMethod.service';
import { GatewayResponse } from '@gateway/types/common.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';

export default class ImpactMethodController {
	public async getImpactMethods(_req: Request, _res: Response) {
		const result = await ImpactMethodService.prototype.getImpactMethods();

		const response = new GatewayResponse({ status: result.status, data: result.data.data, message: result.data.message });

		return _res.status(result.status).json(response);
	}

	public async getImpactMethodById(_req: Request, _res: Response) {
		const id = _req.params.id;

		const result = await ImpactMethodService.prototype.getImpactMethodById({ id });

		const response = new GatewayResponse({ status: result.status, data: result.data.data, message: result.data.message });

		return _res.status(result.status).json(response);
	}

	public async getImpactCategoriesByMethodId(_req: Request, _res: Response) {
		const id = _req.params.id;

		const result = await ImpactMethodService.prototype.getImpactCategoriesByMethodId({ id });

		const response = new GatewayResponse({ status: result.status, data: result.data.data, message: result.data.message });

		return _res.status(result.status).json(response);
	}

	public async createImpactMethod(_req: Request<ParamsDictionary, unknown, CreateImpactMethodReqBody>, _res: Response) {
		const { ...rest } = _req.body;
		const result = await ImpactMethodService.prototype.createImpactMethod(rest);
		const response = new GatewayResponse({ status: result.status, data: result.data.data, message: result.data.message });
		return _res.status(result.status).json(response);
	}
}
