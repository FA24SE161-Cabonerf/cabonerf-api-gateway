import ImpactCategoryService from '@gateway/services/cabonerf-main/impactCategory.service';
import { ParamID } from '@gateway/types/common.types';
import { BaseImpactCategoryReqBody } from '@gateway/types/impactCategory.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

class ImpactCategoryController {
	public async getImpactCategoriesByMethodId(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;

		const result = await ImpactCategoryService.prototype.getImpactCategoriesByMethodId({ id });

		return res.status(result.status).json(result.data);
	}

	public async getImpactCategoryById(req: Request<ParamID, any, any>, res: Response) {
		const { id } = req.params;

		const result = await ImpactCategoryService.prototype.getImpactCategoryById({ id });

		return res.status(result.status).json(result.data);
	}

	public async getAllImpactCategory(_req: Request, res: Response) {
		const result = await ImpactCategoryService.prototype.getAllImpactCategory();
		return res.status(result.status).json(result.data);
	}

	public async createImpactCategory(_req: Request<ParamsDictionary, unknown, BaseImpactCategoryReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await ImpactCategoryService.prototype.createImpactCategory(rest);
		return res.status(result.status).json(result.data);
	}

	public async updateImpactCategory(_req: Request<ParamsDictionary, unknown, BaseImpactCategoryReqBody>, res: Response) {
		const { id } = _req.params;
		const { ...rest } = _req.body;

		const result = await ImpactCategoryService.prototype.updateImpactCategory(id, rest);
		return res.status(result.status).json(result.data);
	}

	public async deleteImpactCategory(_req: Request<ParamID, any, any>, res: Response) {
		const ParamID = _req.params;
		const result = await ImpactCategoryService.prototype.deleteImpactCategory(ParamID);
		return res.status(result.status).json(result.data);
	}
}

export default ImpactCategoryController;
