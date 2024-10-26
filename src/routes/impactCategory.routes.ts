import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import ImpactCategoryController from '@gateway/controllers/cabonerf-main/impactCategory.controllers';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

class ImpactCategoryRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		//Get impact category by method id
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + '/:id' + ROUTE_ENDPOINTS.IMPACT_CATEGORIES,
			validatorAccessToken,
			asyncHandler(ImpactCategoryController.prototype.getImpactCategoriesByMethodId)
		);

		// Get impact category by id
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_CATEGORIES + '/:id',
			validatorAccessToken,
			asyncHandler(ImpactCategoryController.prototype.getImpactCategoryById)
		);

		return this.router;
	}
}

const impactCategoryRoute = new ImpactCategoryRoute();
export default impactCategoryRoute;
