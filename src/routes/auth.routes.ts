import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { MainController } from '@gateway/controllers/cabonerf.main.controllers';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

export class AuthenticationRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	routes() {
		this.router.post(ROUTE_ENDPOINTS.LOGIN, asyncHandler(MainController.prototype.login));

		return this.router;
	}
}

const authenticationRoute = new AuthenticationRoute();
export default authenticationRoute;
