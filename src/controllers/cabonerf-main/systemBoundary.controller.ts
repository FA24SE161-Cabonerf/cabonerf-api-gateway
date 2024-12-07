import { Request, Response } from 'express';
import SystemBoundaryService from '@gateway/services/cabonerf-main/systemBoundary.service';

export default class SystemBoundaryController {
	public async getAllSystemBoundary(_req: Request, res: Response) {
		const result = await SystemBoundaryService.prototype.getAllSystemBoundary();
		return res.status(result.status).json(result.data);
	}
}
