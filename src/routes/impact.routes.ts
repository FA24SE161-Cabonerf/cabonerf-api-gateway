import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import ImpactController from '@gateway/controllers/cabonerf-main/impact.controllers';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

class ImpactRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.get(ROUTE_ENDPOINTS.IMPACT_METHODS, validatorAccessToken, asyncHandler(ImpactController.prototype.getImpactMethods));
		this.router.get(
			ROUTE_ENDPOINTS.IMPACT_METHODS + '/:id',
			validatorAccessToken,
			asyncHandler(ImpactController.prototype.getImpactMethodById)
		);
		this.router.get(
			ROUTE_ENDPOINTS.IMPACT_METHODS + '/:id' + ROUTE_ENDPOINTS.CATEGORIES,
			validatorAccessToken,
			asyncHandler(ImpactController.prototype.getImpactCategoriesByMethodId)
		);
		return this.router;
	}
}

const impactRoute = new ImpactRoute();

export default impactRoute;
