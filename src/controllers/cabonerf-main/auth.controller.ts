import { AuthService } from '@gateway/services/cabonerf-main/auth.service';
import { LoginReqBody, RegisterReqBody, ChangePasswordReqBody } from '@gateway/types/auth.types';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';

export class AuthController {
	public async login(req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) {
		const { email, password } = req.body;

		const result = await AuthService.prototype.login({ email, password });

		return res.status(result.status).json(result.data);
	}

	public async register(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) {
		const { confirmPassword, email, fullName, password } = req.body;

		const result = await AuthService.prototype.register({ confirmPassword, email, fullName, password });

		return res.status(result.status).json(result.data);
	}

	public async logout(req: Request, res: Response) {
		const { refreshToken } = req.body;

		const result = await AuthService.prototype.logout({ refreshToken });

		return res.status(result.status).json(result.data);
	}

	public async me(_req: Request, res: Response) {
		const result = await AuthService.prototype.me();

		return res.status(result.status).json(result.data);
	}

	public async changePassword(_req: Request<ParamsDictionary, unknown, any, ChangePasswordReqBody>, res: Response) {
		const ChangePasswordReqBody = _req.body;
		const result = await AuthService.prototype.changePassword(ChangePasswordReqBody);
		return res.status(result.status).json(result.data);
	}
}
