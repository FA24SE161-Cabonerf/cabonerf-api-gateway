import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import UsersController from '@gateway/controllers/cabonerf-main/users.controller';
class UsersRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// Get all users for admin
		this.router.get(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.ADMIN,
			validatorAccessToken,
			asyncHandler(UsersController.prototype.getAllUsersForAdmin)
		);

		// ban-unban users
		this.router.post(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.BAN_UNBAN + '/:id',
			validatorAccessToken,
			asyncHandler(UsersController.prototype.updateUserStatus)
		);
		return this.router;
	}
}

const usersRoute = new UsersRoute();
export default usersRoute;
