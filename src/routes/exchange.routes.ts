import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import ExchangeController from '@gateway/controllers/cabonerf-main/exchange.controller';
class ExchangeRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// Create product exchange
		this.router.post(
			ROUTE_ENDPOINTS.EXCHANGES + ROUTE_ENDPOINTS.PRODUCT_EXCHANGE,
			validatorAccessToken,
			asyncHandler(ExchangeController.prototype.createProductExchange)
		);

		// Create elementary exchange
		this.router.post(
			ROUTE_ENDPOINTS.EXCHANGES + ROUTE_ENDPOINTS.ELEMENTARY_EXCHANGE,
			validatorAccessToken,
			asyncHandler(ExchangeController.prototype.createElementaryExchange)
		);

		// remove exchange
		this.router.delete(
			ROUTE_ENDPOINTS.EXCHANGES + '/:id',
			validatorAccessToken,
			asyncHandler(ExchangeController.prototype.removeExchange)
		);

		// Search elementary
		this.router.get(
			ROUTE_ENDPOINTS.EMISSION_SUBSTANCE,
			validatorAccessToken,
			asyncHandler(ExchangeController.prototype.getAllEmissionSubstances)
		);

		return this.router;
	}
}

const exchangeRoute = new ExchangeRoute();
export default exchangeRoute;
