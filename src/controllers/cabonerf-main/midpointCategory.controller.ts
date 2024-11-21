import { Request, Response } from 'express';
import { MidpointCategoryService } from '@gateway/services/cabonerf-main/midpointCategory.service';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { BaseMidpointCategoryReqBody } from '@gateway/types/midpointCategory.types';
import { ParamID } from '@gateway/types/common.types';

class MidpointCategoryController {
	public async getAllMidpointCategories(_req: Request, res: Response) {
		const result = await MidpointCategoryService.prototype.getAllMidpointCategories();
		return res.status(result.status).json(result.data);
	}

	public async createMidpointCategory(_req: Request<ParamsDictionary, unknown, any, BaseMidpointCategoryReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await MidpointCategoryService.prototype.createMidpointCategory(rest);
		return res.status(result.status).json(result.data);
	}

	public async updateMidpointCategory(_req: Request<ParamsDictionary, unknown, any, BaseMidpointCategoryReqBody>, res: Response) {
		const { id } = _req.params;
		const { ...rest } = _req.body;
		const result = await MidpointCategoryService.prototype.updateMidpointCategory(id, rest);
		return res.status(result.status).json(result.data);
	}

	public async deleteMidpointCategory(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await MidpointCategoryService.prototype.deleteMidpointCategory(id);
		return res.status(result.status).json(result.data);
	}
}

export default MidpointCategoryController;
