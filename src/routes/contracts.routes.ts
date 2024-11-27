import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import ContractController from '@gateway/controllers/cabonerf-main/contracts.controller';
class ContractRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.get(
			ROUTE_ENDPOINTS.CONTRACTS + '/:id',
			validatorAccessToken,
			asyncHandler(ContractController.prototype.downloadContract)
		);

		return this.router;
	}
}

const contractRoute = new ContractRoute();

export default contractRoute;
