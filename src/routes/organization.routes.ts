import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import OrganizationController from '@gateway/controllers/cabonerf-main/organization.controller';
class OrganizationRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// get all by user
		this.router.get(
			ROUTE_ENDPOINTS.ORGANIZATIONS,
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.getUserOrganization)
		);

		// get organization by id
		this.router.get(
			ROUTE_ENDPOINTS.ORGANIZATIONS + '/:id',
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.getAllByOrganization)
		);

		// get member in organization
		this.router.get(
			ROUTE_ENDPOINTS.ORGANIZATIONS + '/:id' + ROUTE_ENDPOINTS.MEMBERS,
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.getMembersInOrganization)
		);

		// get list member invited by user
		this.router.get(
			ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.INVITED_LIST,
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.getListMemberInvited)
		);

		return this.router;
	}
}

const organizationRoute = new OrganizationRoute();

export default organizationRoute;
