import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import ObjectLibraryController from '@gateway/controllers/cabonerf-main/objectLibrary.controller';

export class ObjectLibraryRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes() {
		// search object lib
		this.router.get(
			ROUTE_ENDPOINTS.OBJECT_LIBRARY + ROUTE_ENDPOINTS.ORGANIZATIONS + '/:orgId',
			validatorAccessToken,
			asyncHandler(ObjectLibraryController.prototype.searchObjectLibraryOfOrganization)
		);

		// Save project to object lib
		this.router.post(
			ROUTE_ENDPOINTS.OBJECT_LIBRARY + '/:projectId',
			validatorAccessToken,
			asyncHandler(ObjectLibraryController.prototype.saveToObjectLibrary)
		);

		// Remove from object library
		this.router.post(
			ROUTE_ENDPOINTS.OBJECT_LIBRARY + ROUTE_ENDPOINTS.ORGANIZATIONS + '/:organizationId',
			validatorAccessToken,
			asyncHandler(ObjectLibraryController.prototype.removeFromObjectLibrary)
		);

		// Add process from object library to project
		this.router.post(
			ROUTE_ENDPOINTS.OBJECT_LIBRARY + '/:processId' + ROUTE_ENDPOINTS.PROJECTS + '/:projectId',
			validatorAccessToken,
			asyncHandler(ObjectLibraryController.prototype.addFromObjectLibraryToProject)
		);

		return this.router;
	}
}

const objectLibraryRoute = new ObjectLibraryRoute();
export default objectLibraryRoute;
