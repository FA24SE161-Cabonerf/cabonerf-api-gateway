import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { LifeCycleStagesController } from '@gateway/controllers/cabonerf-main/lifeCycleStages.controller';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

class LifeCycleStagesRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.get(
			ROUTE_ENDPOINTS.LIFE_CYCLE_STAGES,
			validatorAccessToken,
			asyncHandler(LifeCycleStagesController.prototype.getAllLifeCycleStages)
		);

		return this.router;
	}
}

const lifeCycleStagesRoute = new LifeCycleStagesRoute();

export default lifeCycleStagesRoute;
