import { UnitService } from '@gateway/services/cabonerf-main/unit.service';
import { ParamID } from '@gateway/types/common.types';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { Request, Response } from 'express';
import { CreateUnitReqBody, UpdateUnitReqBody } from '@gateway/types/unit.types';
export default class UnitController {
	public async getAllUnits(_req: Request, res: Response) {
		const result = await UnitService.prototype.getAllUnits();
		return res.status(result.status).json(result.data);
	}
	public async getUnitById(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await UnitService.prototype.getUnitById(id);
		return res.status(result.status).json(result.data);
	}
	public async getAllUnitsInUnitGroup(_req: Request, res: Response) {
		const { groupId } = _req.params;
		const result = await UnitService.prototype.getAllUnitsInUnitGroup(groupId);
		return res.status(result.status).json(result.data);
	}
	public async createUnitInUnitGroup(_req: Request<ParamsDictionary, unknown, CreateUnitReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const { groupId } = _req.params;
		const result = await UnitService.prototype.createUnitInUnitGroup(groupId, rest);
		return res.status(result.status).json(result.data);
	}
	public async updateUnitById(_req: Request<ParamsDictionary, unknown, UpdateUnitReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const { id } = _req.params;
		const result = await UnitService.prototype.updateUnitById(id, rest);
		return res.status(result.status).json(result.data);
	}
	public async deleteUnitById(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await UnitService.prototype.deleteUnitById(id);
		return res.status(result.status).json(result.data);
	}
}
