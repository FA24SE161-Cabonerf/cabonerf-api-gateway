import WorkspaceService from '@gateway/services/cabonerf-main/workspace.service';
import { Request, Response } from 'express';
export default class WorkspaceController {
	public async getUserWorkspace(_req: Request, res: Response) {
		const result = await WorkspaceService.prototype.getUserWorkspace();
		return res.status(result.status).json(result.data);
	}
}
