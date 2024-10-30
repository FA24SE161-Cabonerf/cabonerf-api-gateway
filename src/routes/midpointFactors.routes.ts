import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import MidpointController from '@gateway/controllers/cabonerf-main/midpointFactor.controllers';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

class MidpointRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// Get all midpoint factors
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_FACTORS,
			validatorAccessToken,
			asyncHandler(MidpointController.prototype.getAllMidpointFactors)
		);

		// Get all midpoint factors for admin
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.MIDPOINT_FACTORS,
			validatorAccessToken,
			asyncHandler(MidpointController.prototype.getAllMidpointFactorsForAdmin)
		);

		// Get midpoint factor by id
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_FACTORS + '/:id',
			validatorAccessToken,
			asyncHandler(MidpointController.prototype.getMidpointFactorById)
		);

		return this.router;
	}
}

const midpointRoute = new MidpointRoute();

export default midpointRoute;
