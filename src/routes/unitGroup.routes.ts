import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import express, { Router } from 'express';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import UnitGroupController from '@gateway/controllers/cabonerf-main/unitGroup.controllers';
export class UnitGroupRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.get(ROUTE_ENDPOINTS.UNIT_GROUPS, validatorAccessToken, asyncHandler(UnitGroupController.prototype.getAllUnitGroups));
		this.router.get(
			ROUTE_ENDPOINTS.UNIT_GROUPS + '/:id',
			validatorAccessToken,
			asyncHandler(UnitGroupController.prototype.getUnitGroupById)
		);
		this.router.post(ROUTE_ENDPOINTS.UNIT_GROUPS, validatorAccessToken, asyncHandler(UnitGroupController.prototype.createUnitGroup));
		this.router.put(
			ROUTE_ENDPOINTS.UNIT_GROUPS + '/:id',
			validatorAccessToken,
			asyncHandler(UnitGroupController.prototype.updateUnitGroupById)
		);
		this.router.delete(
			ROUTE_ENDPOINTS.UNIT_GROUPS + '/:id',
			validatorAccessToken,
			asyncHandler(UnitGroupController.prototype.deleteUnitGroupById)
		);
		return this.router;
	}
}

const unitGroupRoute = new UnitGroupRoute();

export default unitGroupRoute;
