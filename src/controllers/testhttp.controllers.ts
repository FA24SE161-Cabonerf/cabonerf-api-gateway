import { AxiosService } from '@gateway/services/axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class TestHttpController {
	public async java(_req: Request, res: Response) {
		const axios = new AxiosService('http://cabonerf-be-service:8080', 'java');

		const response = await axios.axios.get('/api/v1/impacts/impact-methods');

		if (!response) {
			throw new Error('Loi ');
		}
		return res.status(StatusCodes.OK).json({
			content: response.data.data
		});
	}
}
