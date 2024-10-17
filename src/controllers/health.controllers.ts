import { MainService } from '@gateway/services/cabonerf.main.service';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class HealthController {
	public checkHealth(_req: Request, res: Response, _next: NextFunction) {
		return res.status(StatusCodes.OK).json({
			message: 'OK'
		});
	}

	public async checkMainHealth(_req: Request, res: Response, _next: NextFunction) {
		const response = await MainService.prototype.health();

		return res.status(response.status).json(response);
	}
}
