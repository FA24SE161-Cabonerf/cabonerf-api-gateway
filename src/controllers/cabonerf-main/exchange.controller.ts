import ExchangeService from '@gateway/services/cabonerf-main/exchange.service';
import { ParamID } from '@gateway/types/common.types';
import {
	CreateElementaryExchangeReqBody,
	CreateProductExchangeReqBody,
	SearchElementaryQuery,
	UpdateExchangeReqBody
} from '@gateway/types/exchange.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { isUndefined, omitBy } from 'lodash';

type QueryConfig = {
	[key in keyof SearchElementaryQuery]: string;
};

export default class ExchangeController {
	public async createProductExchange(_req: Request<ParamsDictionary, unknown, CreateProductExchangeReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await ExchangeService.prototype.createProductExchange(rest);
		return res.status(result.status).json(result.data);
	}

	public async createElementaryExchange(_req: Request<ParamsDictionary, unknown, CreateElementaryExchangeReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await ExchangeService.prototype.createElementaryExchange(rest);
		return res.status(result.status).json(result.data);
	}

	public async removeExchange(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await ExchangeService.prototype.removeExchange(id);
		return res.status(result.status).json(result.data);
	}

	public async updateElementaryExchange(_req: Request<ParamsDictionary, unknown, UpdateExchangeReqBody>, res: Response) {
		const { id } = _req.params;
		const { ...rest } = _req.body;
		const result = await ExchangeService.prototype.updateElementaryExchange(id, rest);
		return res.status(result.status).json(result.data);
	}

	public async updateProductExchange(_req: Request<ParamsDictionary, unknown, UpdateExchangeReqBody>, res: Response) {
		const { id } = _req.params;
		const { ...rest } = _req.body;
		const result = await ExchangeService.prototype.updateProductExchange(id, rest);
		return res.status(result.status).json(result.data);
	}

	public async getAllEmissionSubstances(_req: Request<ParamsDictionary, any, any, SearchElementaryQuery>, res: Response) {
		const queryParams: QueryConfig = _req.query;

		const params: QueryConfig = omitBy(
			{
				pageCurrent: queryParams.pageCurrent || '1',
				pageSize: queryParams.pageSize || '5',
				methodId: queryParams.methodId || '',
				input: queryParams.input || true,
				keyword: queryParams.keyword,
				emissionCompartmentId: queryParams.emissionCompartmentId,
				impactCategoryId: queryParams.impactCategoryId
			},
			isUndefined
		) as QueryConfig;

		console.log(params);

		const result = await ExchangeService.prototype.getAllEmissionSubstances({ ...params });
		return res.status(result.status).json(result.data);
	}
}
