import { MidpointFactorService } from '@gateway/services/cabonerf-main/midpointFactors.service';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { GatewayResponse, ParamID } from '@gateway/types/common.types';
import { CreateFactorReqBody, ExportFactorReqQuery, GetMidpointSubstanceFactorsAdminReqParams } from '@gateway/types/midpointFactor.types';
import { StatusCodes } from 'http-status-codes';

class MidpointFactorController {
	public async getAllMidpointFactors(_req: Request, res: Response) {
		const result = await MidpointFactorService.prototype.getAllMidpointFactors();
		return res.status(result.status).json(result.data);
	}
	public async getAllMidpointFactorsForAdmin(
		_req: Request<ParamsDictionary, any, any, GetMidpointSubstanceFactorsAdminReqParams>,
		res: Response
	) {
		const GetMidpointSubstanceFactorsAdminReqParams = _req.query;
		const result = await MidpointFactorService.prototype.getAllMidpointFactorsForAdmin(GetMidpointSubstanceFactorsAdminReqParams);
		return res.status(result.status).json(result.data);
	}
	public async getMidpointFactorById(_req: Request<ParamID, any, any>, res: Response) {
		const ParamID = _req.params;
		const result = await MidpointFactorService.prototype.getMidpointFactorById(ParamID);
		return res.status(result.status).json(result.data);
	}
	public async createMidpointFactor(_req: Request<ParamsDictionary, any, any, CreateFactorReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await MidpointFactorService.prototype.createMidpointFactor(rest);
		return res.status(result.status).json(result.data);
	}
	public async deleteMidpointFactor(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await MidpointFactorService.prototype.deleteMidpointFactor(id);
		return res.status(result.status).json(result.data);
	}

	public async downloadFileLog(_req: Request<ParamsDictionary, any, any, { fileName: string }>, res: Response) {
		const { fileName } = _req.query;

		const result = await MidpointFactorService.prototype.downloadFileLog(fileName);

		// Set headers for file download
		res.setHeader('Content-Disposition', result.headers['content-disposition']);
		res.setHeader('Content-Type', result.headers['content-type']);
		res.setHeader('Content-Length', result.headers['content-length']);

		result.data.pipe(res);
	}

	public async importExcel(_req: Request, res: Response) {
		const { methodName } = _req.body;
		const file = _req.file;
		if (!file) {
			return res.status(StatusCodes.BAD_REQUEST).json(
				new GatewayResponse({
					status: 'Error',
					message: 'File is not present',
					data: null
				})
			);
		}
		const result = await MidpointFactorService.prototype.importExcel(file.buffer, methodName);
		return res.status(result.status).json(result.data);
	}

	public async downloadFactorTemplate(_req: Request, res: Response) {
		const result = await MidpointFactorService.prototype.downloadFactorTemplate();
		res.setHeader('Content-Disposition', result.headers['content-disposition']);
		res.setHeader('Content-Type', result.headers['content-type']);
		res.setHeader('Content-Length', result.headers['content-length']);
		result.data.pipe(res);
	}

	public async exportFactor(_req: Request<ParamsDictionary, unknown, any, ExportFactorReqQuery>, res: Response) {
		const ExportFactorReqQuery = _req.query;

		const result = await MidpointFactorService.prototype.exportFactor(ExportFactorReqQuery);
		res.setHeader('Content-Disposition', result.headers['content-disposition']);
		res.setHeader('Content-Type', result.headers['content-type']);
		res.setHeader('Content-Length', result.headers['content-length']);
		result.data.pipe(res);
		// return res.status(result.status).json(result.data);
	}
}

export default MidpointFactorController;
