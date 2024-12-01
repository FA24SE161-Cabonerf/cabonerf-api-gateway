import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import OrganizationController from '@gateway/controllers/cabonerf-main/organization.controller';
import { fileUpload } from '@gateway/middlewares/fileUpload.middleware';
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
			asyncHandler(OrganizationController.prototype.getOrganizationById)
		);

		// get member in organization
		this.router.get(
			ROUTE_ENDPOINTS.ORGANIZATIONS + '/:id' + ROUTE_ENDPOINTS.MEMBERS,
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.getMembersInOrganization)
		);

		// get list member invited by user
		// this.router.get(
		// 	ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.INVITED_LIST,
		// 	validatorAccessToken,
		// 	asyncHandler(OrganizationController.prototype.getListMemberInvited)
		// );

		// upload organization logo
		this.router.post(
			ROUTE_ENDPOINTS.ORGANIZATIONS + '/:id' + ROUTE_ENDPOINTS.UPLOAD_LOGO,
			validatorAccessToken,
			fileUpload.single('logo'),
			asyncHandler(OrganizationController.prototype.uploadLogo)
		);

		// accept invite
		this.router.put(
			ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.ACCEPT_INVITE,
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.acceptInvite)
		);

		// MANAGER ENDPOINTS
		// update organization info -> no longer need this

		// get all for manager
		this.router.get(
			ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.MANAGER,
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.getAllForManager)
		);

		// create organization for manager
		this.router.post(
			ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.MANAGER,
			validatorAccessToken,
			fileUpload.fields([
				{ name: 'contractFile', maxCount: 1 },
				{ name: 'logo', maxCount: 1 }
			]),
			asyncHandler(OrganizationController.prototype.createOrganization)
		);

		// delete organization for manager
		this.router.delete(
			ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.MANAGER + '/:id',
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.deleteOrganizationForManager)
		);

		// ORG MANAGER ENDPOINTS
		// invite user to org
		this.router.post(
			ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.ORGANIZATION_MANAGER + ROUTE_ENDPOINTS.INVITE_MEMBER,
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.inviteMember)
		);

		// remove from org
		this.router.delete(
			ROUTE_ENDPOINTS.ORGANIZATIONS + ROUTE_ENDPOINTS.ORGANIZATION_MANAGER + ROUTE_ENDPOINTS.REMOVE_MEMBER + '/:id',
			validatorAccessToken,
			asyncHandler(OrganizationController.prototype.removeMember)
		);

		return this.router;
	}
}

const organizationRoute = new OrganizationRoute();

export default organizationRoute;
