import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { IndustryCodeController } from '@gateway/controllers/cabonerf-main/industryCode.controller';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

class IndustryCodeRoute {
	// [Org Manager]
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// Get list for create project by organizationId
		this.router.get(
			`${ROUTE_ENDPOINTS.INDUSTRY}/:organizationId`,
			validatorAccessToken,
			asyncHandler(IndustryCodeController.prototype.getIndustryCodeByOrganizationId)
		);

		// Create industry code
		this.router.post(
			`${ROUTE_ENDPOINTS.MANAGER}${ROUTE_ENDPOINTS.INDUSTRY}`,
			validatorAccessToken,
			asyncHandler(IndustryCodeController.prototype.createIndustryCodeByManager)
		);

		// [DELETE]
		this.router.delete(
			`${ROUTE_ENDPOINTS.MANAGER}${ROUTE_ENDPOINTS.INDUSTRY}/:industryCodeId`,
			validatorAccessToken,
			asyncHandler(IndustryCodeController.prototype.deleteIndustryCodeByManager)
		);

		this.router.get(
			`${ROUTE_ENDPOINTS.MANAGER}${ROUTE_ENDPOINTS.INDUSTRY}`,
			validatorAccessToken,
			asyncHandler(IndustryCodeController.prototype.getAllIndustryCode)
		);

		this.router.get(
			ROUTE_ENDPOINTS.MANAGER + ROUTE_ENDPOINTS.INDUSTRY + ROUTE_ENDPOINTS.GET_CREATE,
			validatorAccessToken,
			asyncHandler(IndustryCodeController.prototype.getAllToCreate)
		);
		return this.router;
	}
}

const industryCodeRoute = new IndustryCodeRoute();
export default industryCodeRoute;
