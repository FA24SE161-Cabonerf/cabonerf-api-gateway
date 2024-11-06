import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import MidpointCategoryController from '@gateway/controllers/cabonerf-main/midpointCategory.controller';

class MidpointCategoryRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// Get all midpoint categories
		this.router.get(
			ROUTE_ENDPOINTS.IMPACTS + ROUTE_ENDPOINTS.MIDPOINT_CATEGORIES,
			validatorAccessToken,
			asyncHandler(MidpointCategoryController.prototype.getAllMidpointCategories)
		);

		return this.router;
	}
}

const midpointCategoryRoute = new MidpointCategoryRoute();

export default midpointCategoryRoute;
