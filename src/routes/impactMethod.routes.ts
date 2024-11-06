import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import ImpactMethodController from '@gateway/controllers/cabonerf-main/impactMethod.controller';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

class ImpactMethodRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// Get all impact method
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS,
			validatorAccessToken,
			asyncHandler(ImpactMethodController.prototype.getImpactMethods)
		);

		// Get impact method by id
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + '/:id',
			validatorAccessToken,
			asyncHandler(ImpactMethodController.prototype.getImpactMethodById)
		);

		// Create new impact method
		this.router.post(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS,
			validatorAccessToken,
			asyncHandler(ImpactMethodController.prototype.createImpactMethod)
		);

		// Update impact method with id
		this.router.put(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + '/:id',
			validatorAccessToken,
			asyncHandler(ImpactMethodController.prototype.updateImpactMethodById)
		);

		// Delete impact method with id
		this.router.delete(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + '/:id',
			validatorAccessToken,
			asyncHandler(ImpactMethodController.prototype.deleteImpactMethodById)
		);

		// Add category to method with id
		this.router.post(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.IMPACT_METHODS + '/:methodId' + ROUTE_ENDPOINTS.IMPACT_CATEGORIES + '/:categoryId',
			validatorAccessToken,
			asyncHandler(ImpactMethodController.prototype.addCategoryToMethod)
		);
		return this.router;
	}
}

const impactMethodRoute = new ImpactMethodRoute();

export default impactMethodRoute;
