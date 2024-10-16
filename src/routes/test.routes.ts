import { TestHttpController } from '@gateway/controllers/testhttp.controllers';
import { asyncHandler } from '@gateway/utils/async-handler';
import express, { Router } from 'express';

export class TestHttpRoute {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes() {
		this.router.get('/java', asyncHandler(TestHttpController.prototype.java));

		return this.router;
	}
}

const testHttpRoute = new TestHttpRoute();
export default testHttpRoute;
