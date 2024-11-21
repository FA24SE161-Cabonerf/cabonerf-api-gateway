import { MidpointFactorService } from '@gateway/services/cabonerf-main/midpointFactors.service';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParamID } from '@gateway/types/common.types';
import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';
// import { CreateFactorReqBody } from '@gateway/types/midpointFactor.types';

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
	// public async createMidpointFactor(_req: Request<ParamsDictionary, any, any, CreateFactorReqBody>, res: Response) {
	// 	const { ...rest } = _req.body;
	// 	const result = await MidpointFactorService.prototype.createMidpointFactor(rest);
	// 	return res.status(result.status).json(result.data);
	// }
	// public async deleteMidpointFactor(_req: Request<ParamID, any, any>, res: Response) {
	// 	const { id } = _req.params;
	// 	const result = await MidpointFactorService.prototype.deleteMidpointFactor(id);
	// 	return res.status(result.status).json(result.data);
	// }
	// // todo
	// public async importExcel() {}
	// public async downloadFileLog(_req: Request, res: Response) {
	// 	const { fileName } = _req.query;
	// 	const result = await MidpointFactorService.prototype.downloadFileLog(fileName);
	// 	return res.status(result.status).json(result.data);
	// }
	// public async;
}

export default MidpointFactorController;
