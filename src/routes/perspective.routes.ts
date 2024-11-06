import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import express, { Router } from 'express';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import PerspectiveController from '@gateway/controllers/cabonerf-main/perspective.controller';
export class PerspectiveRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// get all
		this.router.get(
			ROUTE_ENDPOINTS.PERSPECTIVES + '/',
			validatorAccessToken,
			asyncHandler(PerspectiveController.prototype.getAllPerspectives)
		);

		// get by id
		this.router.get(
			ROUTE_ENDPOINTS.PERSPECTIVES + '/:id',
			validatorAccessToken,
			asyncHandler(PerspectiveController.prototype.getPerspectiveById)
		);

		// create
		this.router.post(ROUTE_ENDPOINTS.PERSPECTIVES, validatorAccessToken, asyncHandler(PerspectiveController.prototype.createPerspective));

		// update
		this.router.put(
			ROUTE_ENDPOINTS.PERSPECTIVES + '/:id',
			validatorAccessToken,
			asyncHandler(PerspectiveController.prototype.updatePerspectiveById)
		);

		// delete
		this.router.delete(
			ROUTE_ENDPOINTS.PERSPECTIVES + '/:id',
			validatorAccessToken,
			asyncHandler(PerspectiveController.prototype.deletePerspectiveById)
		);

		return this.router;
	}
}

const perspectiveRoute = new PerspectiveRoute();

export default perspectiveRoute;
