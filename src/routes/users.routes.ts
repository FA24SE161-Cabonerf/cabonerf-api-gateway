import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import UsersController from '@gateway/controllers/cabonerf-main/users.controller';
import { fileUpload } from '@gateway/middlewares/fileUpload.middleware';
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

		// update profile
		this.router.put(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.PROFILE,
			validatorAccessToken,
			asyncHandler(UsersController.prototype.updateUserProfile)
		);

		// update avatar
		this.router.put(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.AVATAR,
			validatorAccessToken,
			fileUpload.single('image'),
			asyncHandler(UsersController.prototype.updateUserAvatar)
		);

		// get user to invite
		this.router.get(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.INVITE_USER,
			validatorAccessToken,
			asyncHandler(UsersController.prototype.getUserToInvite)
		);

		// get user in dashboard
		this.router.get(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.COUNT_NEW_USER,
			validatorAccessToken,
			asyncHandler(UsersController.prototype.getUserInDashboard)
		);

		// count all user
		this.router.get(
			ROUTE_ENDPOINTS.USERS + ROUTE_ENDPOINTS.ADMIN + ROUTE_ENDPOINTS.COUNT_ALL_USER,
			validatorAccessToken,
			asyncHandler(UsersController.prototype.countAllUser)
		);

		return this.router;
	}
}

const usersRoute = new UsersRoute();
export default usersRoute;
