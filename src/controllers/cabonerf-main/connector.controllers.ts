import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { CreateConnectorReqBody } from '@gateway/types/connector.types';
import ConnectorService from '@gateway/services/cabonerf-main/connector.service';

export default class ConnectorController {
	public async createConnector(_req: Request<ParamsDictionary, unknown, CreateConnectorReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await ConnectorService.prototype.createConnector(rest);
		return res.status(result.status).json(result.data);
	}
}
