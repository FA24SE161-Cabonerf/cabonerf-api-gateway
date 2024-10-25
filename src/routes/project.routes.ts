import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { ProjectController } from '@gateway/controllers/cabonerf-main/project.controllers';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

export class ProjectRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes() {
		this.router.get(ROUTE_ENDPOINTS.PROJECTS, validatorAccessToken, asyncHandler(ProjectController.prototype.getProjects));

		return this.router;
	}
}

const projectRoute = new ProjectRoute();
export default projectRoute;
