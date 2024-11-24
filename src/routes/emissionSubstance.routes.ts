import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import EmissionSubstanceController from '@gateway/controllers/cabonerf-main/emissionSubstance.controller';

class EmissionSubstanceRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.get(
			ROUTE_ENDPOINTS.EMISSION_SUBSTANCE + ROUTE_ENDPOINTS.ADMIN,
			validatorAccessToken,
			asyncHandler(EmissionSubstanceController.prototype.getEmissionSubstance)
		);

		return this.router;
	}
}

const emissionSubstanceRoute = new EmissionSubstanceRoute();
export default emissionSubstanceRoute;
