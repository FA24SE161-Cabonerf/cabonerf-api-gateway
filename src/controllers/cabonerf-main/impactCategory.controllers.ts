import ImpactCategoryService from '@gateway/services/cabonerf-main/impactCategory.service';
import { ParamID } from '@gateway/types/common.types';
import { Request, Response } from 'express';

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
}

export default ImpactCategoryController;
