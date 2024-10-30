import { Request, Response } from 'express';
import { MidpointCategoryService } from '@gateway/services/cabonerf-main/midpointCategory.service';
class MidpointCategoryController {
	public async getAllMidpointCategories(_req: Request, res: Response) {
		const result = await MidpointCategoryService.prototype.getAllMidpointCategories();
		return res.status(result.status).json(result.data);
	}
}

export default MidpointCategoryController;
