import { ROUTE_ENDPOINTS } from '@gateway/constants/routeEndpoints';
import { validatorAccessToken } from '@gateway/middlewares/token.middleware';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';
import DatasetController from '@gateway/controllers/cabonerf-main/dataset.contrller';

export class DatasetRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes() {
		// get all datasets
		this.router.get(ROUTE_ENDPOINTS.DATASETS, validatorAccessToken, asyncHandler(DatasetController.prototype.getAllDataset));

		return this.router;
	}
}

const datasetRoute = new DatasetRoute();
export default datasetRoute;
