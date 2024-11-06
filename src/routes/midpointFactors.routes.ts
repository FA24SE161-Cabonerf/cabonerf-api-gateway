import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import MidpointFactorController from '@gateway/controllers/cabonerf-main/midpointFactor.controller';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

class MidpointFactorRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// Get all midpoint factors
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_FACTORS,
			validatorAccessToken,
			asyncHandler(MidpointFactorController.prototype.getAllMidpointFactors)
		);

		// Get all midpoint factors for admin
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.MIDPOINT_FACTORS,
			validatorAccessToken,
			asyncHandler(MidpointFactorController.prototype.getAllMidpointFactorsForAdmin)
		);

		// Get midpoint factor by id
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_FACTORS + '/:id',
			validatorAccessToken,
			asyncHandler(MidpointFactorController.prototype.getMidpointFactorById)
		);

		return this.router;
	}
}

const midpointFactorRoute = new MidpointFactorRoute();

export default midpointFactorRoute;
