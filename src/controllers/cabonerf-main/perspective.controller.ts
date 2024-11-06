import { ParamID } from '@gateway/types/common.types';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { BasePerspectiveReqBody } from '@gateway/types/perspective.types';
import { Request, Response } from 'express';
import { PerspectiveService } from '@gateway/services/cabonerf-main/perspective.service';

export default class PerspectiveController {
	public async getAllPerspectives(_req: Request, res: Response) {
		const result = await PerspectiveService.prototype.getAllPerspectives();
		return res.status(result.status).json(result.data);
	}

	public async getPerspectiveById(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await PerspectiveService.prototype.getPerspectiveById(id);
		return res.status(result.status).json(result.data);
	}

	public async createPerspective(_req: Request<ParamsDictionary, unknown, BasePerspectiveReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await PerspectiveService.prototype.createPerspective(rest);
		return res.status(result.status).json(result.data);
	}

	public async updatePerspectiveById(_req: Request<ParamsDictionary, unknown, BasePerspectiveReqBody>, res: Response) {
		const { id } = _req.params;
		const { ...rest } = _req.body;
		const result = await PerspectiveService.prototype.updatePerspectiveById(id, rest);
		return res.status(result.status).json(result.data);
	}

	public async deletePerspectiveById(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await PerspectiveService.prototype.deletePerspectiveById(id);
		return res.status(result.status).json(result.data);
	}
}
