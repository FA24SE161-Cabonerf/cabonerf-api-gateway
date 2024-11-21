import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import EmissionCompartmentController from '@gateway/controllers/cabonerf-main/emissionCompartment.controller';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

class EmissionCompartmentRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.get(
			ROUTE_ENDPOINTS.EMISSIONS + ROUTE_ENDPOINTS.EMISSION_COMPARTMENT,
			validatorAccessToken,
			asyncHandler(EmissionCompartmentController.prototype.getListEmissionCompartment)
		);

		this.router.post(
			ROUTE_ENDPOINTS.EMISSIONS + ROUTE_ENDPOINTS.EMISSION_COMPARTMENT,
			validatorAccessToken,
			asyncHandler(EmissionCompartmentController.prototype.createEmissionCompartment)
		);

		this.router.put(
			ROUTE_ENDPOINTS.EMISSIONS + ROUTE_ENDPOINTS.EMISSION_COMPARTMENT + '/:id',
			validatorAccessToken,
			asyncHandler(EmissionCompartmentController.prototype.updateEmissionCompartment)
		);

		this.router.delete(
			ROUTE_ENDPOINTS.EMISSIONS + ROUTE_ENDPOINTS.EMISSION_COMPARTMENT + '/:id',
			validatorAccessToken,
			asyncHandler(EmissionCompartmentController.prototype.deleteEmissionCompartment)
		);

		return this.router;
	}
}

const emissionCompartmentRoute = new EmissionCompartmentRoute();
export default emissionCompartmentRoute;
