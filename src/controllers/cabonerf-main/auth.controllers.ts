import { AuthService } from '@gateway/services/cabonerf-main/auth.service';
import { LoginReqBody, RegisterReqBody } from '@gateway/types/auth.type';
import { JWTPayload } from '@gateway/types/jwt.type';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core/index';

export class AuthController {
	public async login(req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) {
		const { email, password } = req.body;

		const response = await AuthService.prototype.login({ email, password });

		return res.status(response.status).json(response.data);
	}

	public async register(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) {
		const { confirmPassword, email, fullName, password } = req.body;

		const response = await AuthService.prototype.register({ confirmPassword, email, fullName, password });

		return res.status(response.status).json(response.data);
	}

	public async logout(req: Request, res: Response) {
		const { refreshToken } = req.body;

		const encodedJWT = req.jwtClientGatewayDecoded as JWTPayload;

		const response = await AuthService.prototype.logout({ refreshToken }, encodedJWT);

		return res.status(response.status).json(response.data);
	}

	public async me(req: Request, res: Response) {
		const encodedJWT = req.jwtClientGatewayDecoded as JWTPayload;

		const response = await AuthService.prototype.me(encodedJWT);

		return res.status(response.status).json(response.data);
	}
}
