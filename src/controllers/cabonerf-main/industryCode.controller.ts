import { IndsutryCodeService } from '@gateway/services/cabonerf-main/industryCode.service';
import { GetIndustryCodeReqQuery } from '@gateway/types/industryCode.types';
import log from '@gateway/utils/logger';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';
export class IndustryCodeController {
	public async getIndustryCodeByOrganizationId(req: Request<{ organizationId: string }>, res: Response) {
		const { organizationId } = req.params;
		log.info('getIndustryCodeByOrganizationId: ', organizationId);

		const repsonse = await IndsutryCodeService.prototype.getListIndustryCodeByOrganizationId({ orgId: organizationId });
		return res.status(repsonse.status).json(repsonse.data);
	}

	public async createIndustryCodeByManager(req: Request<ParamsDictionary, unknown, { code: string; name: string }>, res: Response) {
		const { code, name } = req.body;
		const response = await IndsutryCodeService.prototype.createIndustryCodeByManager({ code, name });

		return res.status(response.status).json(response.data);
	}

	public async deleteIndustryCodeByManager(req: Request<{ industryCodeId: string }>, res: Response) {
		const { industryCodeId } = req.params;

		const response = await IndsutryCodeService.prototype.deleteIndustryCodeByManager({ id: industryCodeId });

		return res.status(response.status).json(response.data);
	}

	public async getAllIndustryCode(req: Request<ParamsDictionary, unknown, any, GetIndustryCodeReqQuery>, res: Response) {
		const query = req.query;
		log.info('getAllIndustryCode: ', query);
		const response = await IndsutryCodeService.prototype.getAllIndustryCodeByManager(query);

		return res.status(response.status).json(response.data);
	}

	public async getAllToCreate(_req: Request<ParamsDictionary, unknown, any, { keyword: string }>, res: Response) {
		const { keyword } = _req.query;
		log.info('getAllInCreate: ', keyword);
		const response = await IndsutryCodeService.prototype.getAllToCreate({ keyword });
		return res.status(response.status).json(response.data);
	}
}
