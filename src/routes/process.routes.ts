import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { ProcessController } from '@gateway/controllers/cabonerf-main/process.controller';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

export class ProcessRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes() {
		// Get all process
		// this.router.get(ROUTE_ENDPOINTS.PROJECTS, validatorAccessToken, asyncHandler(ProcessController.prototype.));

		// Get process by id
		this.router.get(`${ROUTE_ENDPOINTS.PROCESS}/:id`, validatorAccessToken, asyncHandler(ProcessController.prototype.getProcessById));

		// Create process
		this.router.post(ROUTE_ENDPOINTS.PROCESS, validatorAccessToken, asyncHandler(ProcessController.prototype.createProcess));

		// Update process
		this.router.put(`${ROUTE_ENDPOINTS.PROCESS}/:id`, validatorAccessToken, asyncHandler(ProcessController.prototype.updateProcess));

		// Delete process
		this.router.delete(`${ROUTE_ENDPOINTS.PROJECTS}/:id`, validatorAccessToken, asyncHandler(ProcessController.prototype.deleteProcess));

		return this.router;
	}
}

const processRoute = new ProcessRoute();
export default processRoute;
