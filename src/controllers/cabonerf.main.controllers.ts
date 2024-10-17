import mainService from '@gateway/services/cabonerf.main.service';
import { LoginReqBody } from '@gateway/types/auth.type';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { StatusCodes } from 'http-status-codes';

export class MainController {
	public async login(req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) {
		const { email, password } = req.body;

		const response = await mainService.login({ email, password });

		return res.status(StatusCodes.OK).json(response.data);
	}
}
