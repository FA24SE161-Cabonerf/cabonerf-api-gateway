import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import express, { Router } from 'express';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import UnitController from '@gateway/controllers/cabonerf-main/unit.controller';

export class UnitRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		// get all units
		this.router.get(ROUTE_ENDPOINTS.UNITS, validatorAccessToken, asyncHandler(UnitController.prototype.getAllUnits));
		// get by id
		this.router.get(ROUTE_ENDPOINTS.UNITS + '/:id', validatorAccessToken, asyncHandler(UnitController.prototype.getUnitById));
		// get all from unit group
		this.router.get(
			ROUTE_ENDPOINTS.UNIT_GROUPS + '/:groupId' + ROUTE_ENDPOINTS.UNITS,
			validatorAccessToken,
			asyncHandler(UnitController.prototype.getAllUnitsInUnitGroup)
		);
		// create in unit group
		this.router.post(
			ROUTE_ENDPOINTS.UNIT_GROUPS + '/:groupId' + ROUTE_ENDPOINTS.UNITS,
			validatorAccessToken,
			asyncHandler(UnitController.prototype.createUnitInUnitGroup)
		);
		// update
		this.router.put(ROUTE_ENDPOINTS.UNITS + '/:id', validatorAccessToken, asyncHandler(UnitController.prototype.updateUnitById));
		// delete
		this.router.delete(ROUTE_ENDPOINTS.UNITS + '/:id', validatorAccessToken, asyncHandler(UnitController.prototype.deleteUnitById));
		return this.router;
	}
}

const unitRoute = new UnitRoute();

export default unitRoute;
