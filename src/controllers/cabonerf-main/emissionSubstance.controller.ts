import { Request, Response } from 'express';
import EmissionSubstanceService from '@gateway/services/cabonerf-main/emissionSubstance.service';
import { ParamsDictionary } from 'express-serve-static-core';
import { GetEmissionSubstanceReqParams } from '@gateway/types/emissionSubstance.types';

export default class EmissionSubstanceController {
	public async getEmissionSubstance(_req: Request<ParamsDictionary, unknown, any, GetEmissionSubstanceReqParams>, res: Response) {
		const GetEmissionSubstanceReqParams = _req.query;
		var keyword = '';
		if (GetEmissionSubstanceReqParams.keyword != undefined) {
			keyword = GetEmissionSubstanceReqParams.keyword;
		}

		const result = await EmissionSubstanceService.prototype.getEmissionSubstance({ keyword });
		return res.status(result.status).json(result.data);
	}
}
