import { MidpointService } from '@gateway/services/cabonerf-main/midpointFactors.service';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParamID } from '@gateway/types/common.types';

class MidpointController {
	public async getAllMidpointFactors(_req: Request, res: Response) {
		const result = await MidpointService.prototype.getAllMidpointFactors();
		return res.status(result.status).json(result.data);
	}
	public async getAllMidpointFactorsForAdmin(_req: Request<ParamsDictionary, any, any, PaginationRequest>, res: Response) {
		const PaginationRequest = _req.query;
		const result = await MidpointService.prototype.getAllMidpointFactorsForAdmin(PaginationRequest);
		return res.status(result.status).json(result.data);
	}
	public async getMidpointFactorById(_req: Request<ParamID, any, any>, res: Response) {
		const ParamID = _req.params;
		const result = await MidpointService.prototype.getMidpointFactorById(ParamID);
		return res.status(result.status).json(result.data);
	}
}
import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

export default MidpointController;
