import EmissionCompartmentService from '@gateway/services/cabonerf-main/emissionCompartment.service';
import { ParamID } from '@gateway/types/common.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { BaseEmissionCompartmentReqBody } from '@gateway/types/emissionCompartment.types';

class EmissionCompartmentController {
	public async getListEmissionCompartment(_req: Request, res: Response) {
		const response = await EmissionCompartmentService.prototype.getListEmissionCompartment();
		return res.status(response.status).json(response.data);
	}

	public async createEmissionCompartment(_req: Request<ParamsDictionary, unknown, any, BaseEmissionCompartmentReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const response = await EmissionCompartmentService.prototype.createEmissionCompartment(rest);
		return res.status(response.status).json(response.data);
	}

	public async updateEmissionCompartment(_req: Request<ParamsDictionary, unknown, any, BaseEmissionCompartmentReqBody>, res: Response) {
		const { id } = _req.params;
		const { ...rest } = _req.body;
		const response = await EmissionCompartmentService.prototype.updateEmissionCompartment(id, rest);
		return res.status(response.status).json(response.data);
	}

	public async deleteEmissionCompartment(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const response = await EmissionCompartmentService.prototype.deleteEmissionCompartment(id);
		return res.status(response.status).json(response.data);
	}
}
export default EmissionCompartmentController;
