import EmissionCompartmentService from '@gateway/services/cabonerf-main/emissionCompartment.service';
import { Request, Response } from 'express';

class EmissionCompartmentController {
	public async getListEmissionCompartment(_req: Request, res: Response) {
		const response = await EmissionCompartmentService.prototype.getListEmissionCompartment();

		return res.status(response.status).json(response.data);
	}
}
export default EmissionCompartmentController;
