import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { ProjectController } from '@gateway/controllers/cabonerf-main/project.controller';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

export class ProjectRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes() {
		// Get all projects
		this.router.get(ROUTE_ENDPOINTS.PROJECTS, validatorAccessToken, asyncHandler(ProjectController.prototype.getAllProjects));

		// Get project by id
		this.router.get(`${ROUTE_ENDPOINTS.PROJECTS}/:id`, validatorAccessToken, asyncHandler(ProjectController.prototype.getProjectByID));

		// Create project
		this.router.post(ROUTE_ENDPOINTS.PROJECTS, validatorAccessToken, asyncHandler(ProjectController.prototype.createProject));

		// Update project`
		this.router.put(`${ROUTE_ENDPOINTS.PROJECTS}/:id`, validatorAccessToken, asyncHandler(ProjectController.prototype.updateProject));

		// Delete project
		this.router.delete(
			`${ROUTE_ENDPOINTS.PROJECTS}/:id`,
			validatorAccessToken,
			asyncHandler(ProjectController.prototype.deleteProjectByID)
		);
		// Change method of project
		this.router.patch(
			ROUTE_ENDPOINTS.PROJECTS + '/:projectId' + ROUTE_ENDPOINTS.IMPACT_METHODS + '/:methodId',
			validatorAccessToken,
			asyncHandler(ProjectController.prototype.changeProjectMethod)
		);

		// Calculate project
		this.router.post(
			ROUTE_ENDPOINTS.PROJECTS + ROUTE_ENDPOINTS.CALCULATION,
			validatorAccessToken,
			asyncHandler(ProjectController.prototype.calculateProject)
		);

		// update favourite
		this.router.put(
			ROUTE_ENDPOINTS.PROJECTS + '/:id' + ROUTE_ENDPOINTS.FAVORITE,
			validatorAccessToken,
			asyncHandler(ProjectController.prototype.updateFavoriteProject)
		);

		// get project intensity
		this.router.get(
			ROUTE_ENDPOINTS.PROJECTS + '/:id' + ROUTE_ENDPOINTS.INTENSITY,
			validatorAccessToken,
			asyncHandler(ProjectController.prototype.getProjectIntensity)
		);

		// export project
		this.router.get(
			ROUTE_ENDPOINTS.PROJECTS + '/:id' + ROUTE_ENDPOINTS.EXPORT_PROJECT,
			validatorAccessToken,
			asyncHandler(ProjectController.prototype.exportProject)
		);

		// count all project
		this.router.get(
			ROUTE_ENDPOINTS.PROJECTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.COUNT_PROJECTS,
			validatorAccessToken,
			asyncHandler(ProjectController.prototype.countAllProject)
		);

		// get sum project
		this.router.get(ROUTE_ENDPOINTS.PROJECTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.SUM_IMPACT),
			validatorAccessToken,
			asyncHandler(ProjectController.prototype.getSumImpact);

		return this.router;
	}
}

const projectRoute = new ProjectRoute();
export default projectRoute;
