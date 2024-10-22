import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { AuthController } from '@gateway/controllers/cabonerf-main/auth.controllers';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

export class AuthenticationRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	routes() {
		this.router.post(ROUTE_ENDPOINTS.LOGIN, asyncHandler(AuthController.prototype.login));
		this.router.post(ROUTE_ENDPOINTS.REGISTER, asyncHandler(AuthController.prototype.register));
		this.router.post(ROUTE_ENDPOINTS.LOGOUT, validatorAccessToken, asyncHandler(AuthController.prototype.logout));
		this.router.get(ROUTE_ENDPOINTS.ME, validatorAccessToken, asyncHandler(AuthController.prototype.me));

		return this.router;
	}
}

const authRoute = new AuthenticationRoute();
export default authRoute;
