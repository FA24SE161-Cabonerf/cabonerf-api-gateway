import { MidpointFactorService } from '@gateway/services/cabonerf-main/midpointFactors.service';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParamID } from '@gateway/types/common.types';

class MidpointFactorController {
	public async getAllMidpointFactors(_req: Request, res: Response) {
		const result = await MidpointFactorService.prototype.getAllMidpointFactors();
		return res.status(result.status).json(result.data);
	}
	public async getAllMidpointFactorsForAdmin(_req: Request<ParamsDictionary, any, any, PaginationRequest>, res: Response) {
		const PaginationRequest = _req.query;
		const result = await MidpointFactorService.prototype.getAllMidpointFactorsForAdmin(PaginationRequest);
		return res.status(result.status).json(result.data);
	}
	public async getMidpointFactorById(_req: Request<ParamID, any, any>, res: Response) {
		const ParamID = _req.params;
		const result = await MidpointFactorService.prototype.getMidpointFactorById(ParamID);
		return res.status(result.status).json(result.data);
	}
}
import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

export default MidpointFactorController;
