import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import ConnectorController from '@gateway/controllers/cabonerf-main/connector.controllers';

class ConnectorRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// Create connector
		this.router.post(ROUTE_ENDPOINTS.CONNECTOR, validatorAccessToken, asyncHandler(ConnectorController.prototype.createConnector));
		return this.router;
	}
}

const connectorRoute = new ConnectorRoute();
export default connectorRoute;
