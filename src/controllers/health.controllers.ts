import { HealthService } from '@gateway/services/cabonerf-main/health.service';
import { HealthNodebasedService } from '@gateway/services/cabonerf-nodebased/health.service';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class HealthController {
	public checkHealth(_req: Request, res: Response, _next: NextFunction) {
		return res.status(StatusCodes.OK).json({
			message: 'OK'
		});
	}

	public async checkMainHealth(_req: Request, res: Response, _next: NextFunction) {
		const response = await HealthService.prototype.health();

		return res.status(response.status).json({
			message: 'OK'
		});
	}

	public async checkNodebasedHealth(_req: Request, res: Response, _next: NextFunction) {
		const response = await HealthNodebasedService.prototype.checkHealth();

		return res.status(response.status).json(response.data);
	}
}
