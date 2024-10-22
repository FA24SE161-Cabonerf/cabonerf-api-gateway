import { AuthService } from '@gateway/services/cabonerf-main/auth.service';
import { LoginReqBody, RegisterReqBody } from '@gateway/types/auth.type';
import { GatewayResponse } from '@gateway/types/common.types';
import { JWTPayload } from '@gateway/types/jwt.type';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';

export class AuthController {
	public async login(req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) {
		const { email, password } = req.body;

		const result = await AuthService.prototype.login({ email, password });

		const response = new GatewayResponse({ data: result.data.data, message: result.data.message, status: result.status });

		return res.status(result.status).json(response);
	}

	public async register(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) {
		const { confirmPassword, email, fullName, password } = req.body;

		const result = await AuthService.prototype.register({ confirmPassword, email, fullName, password });

		const response = new GatewayResponse({ data: result.data.data, message: result.data.message, status: result.status });

		return res.status(result.status).json(response);
	}

	public async logout(req: Request, res: Response) {
		const { refreshToken } = req.body;

		const encodedJWT = req.jwtClientGatewayDecoded as JWTPayload;

		const result = await AuthService.prototype.logout({ refreshToken }, encodedJWT);

		const response = new GatewayResponse({ data: result.data.data, message: result.data.message, status: result.status });

		return res.status(result.status).json(response);
	}

	public async me(req: Request, res: Response) {
		const encodedJWT = req.jwtClientGatewayDecoded as JWTPayload;

		const result = await AuthService.prototype.me(encodedJWT);

		const response = new GatewayResponse({ data: result.data.data, message: result.data.message, status: result.status });

		return res.status(result.status).json(response);
	}
}
