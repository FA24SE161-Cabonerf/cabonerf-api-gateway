import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { CreateElementaryExchangeReqBody, CreateProductExchangeReqBody } from '@gateway/types/exchange.types';
import ExchangeService from '@gateway/services/cabonerf-main/exchange.service';

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
}
