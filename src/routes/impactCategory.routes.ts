import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import ImpactCategoryController from '@gateway/controllers/cabonerf-main/impactCategory.controller';
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

		// Get all impact category
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_CATEGORIES,
			validatorAccessToken,
			asyncHandler(ImpactCategoryController.prototype.getAllImpactCategory)
		);

		// Create impact category
		this.router.post(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_CATEGORIES,
			validatorAccessToken,
			asyncHandler(ImpactCategoryController.prototype.createImpactCategory)
		);

		// Update impact category with id
		this.router.put(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_CATEGORIES + '/:id',
			validatorAccessToken,
			asyncHandler(ImpactCategoryController.prototype.updateImpactCategory)
		);

		// Delete impact category with id
		this.router.delete(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_CATEGORIES + '/:id',
			validatorAccessToken,
			asyncHandler(ImpactCategoryController.prototype.deleteImpactCategory)
		);

		// Delete Impact Category From Method
		this.router.delete(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_CATEGORIES + '/:categoryId' + ROUTE_ENDPOINTS.IMPACT_METHODS + '/:methodId',
			validatorAccessToken,
			asyncHandler(ImpactCategoryController.prototype.deleteImpactCategoryFromMethod)
		);

		return this.router;
	}
}

const impactCategoryRoute = new ImpactCategoryRoute();
export default impactCategoryRoute;
