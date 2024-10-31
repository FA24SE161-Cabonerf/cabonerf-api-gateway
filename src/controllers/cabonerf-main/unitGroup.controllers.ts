import { ParamID } from '@gateway/types/common.types';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { Request, Response } from 'express';
import UnitGroupService from '@gateway/services/cabonerf-main/unitGroup.service';
import { BaseUnitGroupReqBody } from '@gateway/types/unitGroup.types';
export default class UnitGroupController {
	public async getAllUnitGroups(_req: Request, res: Response) {
		const result = await UnitGroupService.prototype.getAllUnitGroups();
		return res.status(result.status).json(result.data);
	}
	public async getUnitGroupById(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await UnitGroupService.prototype.getUnitGroupById(id);
		return res.status(result.status).json(result.data);
	}
	public async createUnitGroup(_req: Request<ParamsDictionary, unknown, BaseUnitGroupReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await UnitGroupService.prototype.createUnitGroup(rest);
		return res.status(result.status).json(result.data);
	}
	public async updateUnitGroupById(_req: Request<ParamsDictionary, unknown, BaseUnitGroupReqBody>, res: Response) {
		const { id } = _req.params;
		const { ...rest } = _req.body;
		const result = await UnitGroupService.prototype.updateUnitGroupById(id, rest);
		return res.status(result.status).json(result.data);
	}
	public async deleteUnitGroupById(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await UnitGroupService.prototype.deleteUnitGroupById(id);
		return res.status(result.status).json(result.data);
	}
}
