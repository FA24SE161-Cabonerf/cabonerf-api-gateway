import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import WorkspaceController from '@gateway/controllers/cabonerf-main/workspace.controller';
class WorkspaceRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.get(ROUTE_ENDPOINTS.WORKSPACE, validatorAccessToken, asyncHandler(WorkspaceController.prototype.getUserWorkspace));

		return this.router;
	}
}

const workspaceRoute = new WorkspaceRoute();

export default workspaceRoute;
