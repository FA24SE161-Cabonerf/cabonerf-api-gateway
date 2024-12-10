import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import DatasetController from '@gateway/controllers/cabonerf-main/dataset.controller';

export class DatasetRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes() {
		// get all datasets
		this.router.get(ROUTE_ENDPOINTS.DATASETS, validatorAccessToken, asyncHandler(DatasetController.prototype.getAllDataset));

		// get all by admin
		this.router.get(
			ROUTE_ENDPOINTS.DATASETS + ROUTE_ENDPOINTS.ADMIN,
			validatorAccessToken,
			asyncHandler(DatasetController.prototype.getAllDatasetByAdmin)
		);
		return this.router;
	}
}

const datasetRoute = new DatasetRoute();
export default datasetRoute;
