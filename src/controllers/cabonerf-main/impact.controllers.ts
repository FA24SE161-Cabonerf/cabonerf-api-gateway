import { ImpactService } from '@gateway/services/cabonerf-main/impact.service';
import { GatewayResponse } from '@gateway/types/common.types';
import { Request, Response } from 'express';

export default class ImpactController {
	public async getImpactMethods(_req: Request, _res: Response) {
		const result = await ImpactService.prototype.getImpactMethods();

		const response = new GatewayResponse({ status: result.status, data: result.data.data, message: result.data.message });

		return _res.status(result.status).json(response);
	}

	public async getImpactMethodById(_req: Request, _res: Response) {
		const id = _req.params.id;

		const result = await ImpactService.prototype.getImpactMethodById({ id });

		const response = new GatewayResponse({ status: result.status, data: result.data.data, message: result.data.message });

		return _res.status(result.status).json(response);
	}

	public async getImpactCategoriesByMethodId(_req: Request, _res: Response) {
		const id = _req.params.id;

		const result = await ImpactService.prototype.getImpactCategoriesByMethodId({ id });

		const response = new GatewayResponse({ status: result.status, data: result.data.data, message: result.data.message });

		return _res.status(result.status).json(response);
	}
}
