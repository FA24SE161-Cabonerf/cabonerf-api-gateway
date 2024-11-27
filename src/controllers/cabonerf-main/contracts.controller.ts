import { ParamID } from '@gateway/types/common.types';
import { Request, Response } from 'express';
import ContractService from '@gateway/services/cabonerf-main/contracts.service';

export default class ContractController {
	public async downloadContract(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await ContractService.prototype.downloadContract(id);
		// Set headers for file download
		res.setHeader('Content-Disposition', result.headers['content-disposition']);
		res.setHeader('Content-Type', result.headers['content-type']);
		res.setHeader('Content-Length', result.headers['content-length']);

		result.data.pipe(res);
	}
}
