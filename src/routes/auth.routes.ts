import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { AuthController } from '@gateway/controllers/cabonerf-main/auth.controllers';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

export class AuthenticationRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	routes() {
		this.router.post(ROUTE_ENDPOINTS.LOGIN, asyncHandler(AuthController.prototype.login));

		return this.router;
	}
}

const authRoute = new AuthenticationRoute();
export default authRoute;
