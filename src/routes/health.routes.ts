import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { HealthController } from '@gateway/controllers/health.controllers';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

class HealthRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	routes(): Router {
		this.router.get(ROUTE_ENDPOINTS.GATEWAY_HEALTH, asyncHandler(HealthController.prototype.checkHealth));
		this.router.get(ROUTE_ENDPOINTS.MAIN_HEALTH, asyncHandler(HealthController.prototype.checkMainHealth));
		return this.router;
	}
}

const healthRoute = new HealthRoute();
export default healthRoute;
