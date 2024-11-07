import ExchangeService from '@gateway/services/cabonerf-main/exchange.service';
import { CreateElementaryExchangeReqBody, CreateProductExchangeReqBody, SearchElementaryQuery } from '@gateway/types/exchange.types';
import { Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core/index';
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

	public async getAllEmissionSubstances(_req: Request<ParamsDictionary, any, any, SearchElementaryQuery>, _res: Response) {
		const queryParams: QueryConfig = _req.query;

		const params: QueryConfig = omitBy(
			{
				pageCurrent: queryParams.pageCurrent || '2',
				pageSize: queryParams.pageSize || '1',
				methodId: queryParams.methodId || 'asd',
				keyword: queryParams.keyword,
				emissionCompartmentId: queryParams.emissionCompartmentId,
				impactCategoryId: queryParams.impactCategoryId
			},
			isUndefined
		);

		console.log(params);

		const result = await ExchangeService.prototype.getAllEmissionSubstances({ ...params });
		// return res.status(result.status).json(result.data);
	}
}
