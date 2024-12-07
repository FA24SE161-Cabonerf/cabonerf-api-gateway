import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import SystemBoundaryController from '@gateway/controllers/cabonerf-main/systemBoundary.controller';

export class SystemBoundaryRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes() {
		// get all system boundary
		this.router.get(
			ROUTE_ENDPOINTS.SYSTEM_BOUNDARY,
			validatorAccessToken,
			asyncHandler(SystemBoundaryController.prototype.getAllSystemBoundary)
		);

		return this.router;
	}
}

const systemBoundaryRoute = new SystemBoundaryRoute();
export default systemBoundaryRoute;
