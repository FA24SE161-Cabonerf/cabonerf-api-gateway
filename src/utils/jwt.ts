import config from '@gateway/config';
import { CommonGatewayError } from '@gateway/errors/gateway.errors';
import mainAxiosService from '@gateway/services/cabonerf-main/main.axios';
import { JWTPayload } from '@gateway/types/jwt.type';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { JsonWebTokenError, verify } from 'jsonwebtoken';

export const verifyBearer = (_token: string) => {
	const [bearer, token] = _token.split(' ');

	if (!bearer || bearer !== 'Bearer') {
		throw new CommonGatewayError(StatusCodes.UNPROCESSABLE_ENTITY, { message: 'Token is invalid' }, 'Error');
	}

	return token;
};

export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
	return new Promise<JWTPayload>((resolve, reject) => {
		verify(token, secretOrPublicKey, { algorithms: ['HS256'] }, (error, decoded) => {
			if (error) {
				// Use reject directly instead of throwing
				return reject(error.message);
			}
			resolve(decoded as JWTPayload);
		});
	});
};

export const verifyAccessToken = async (value: string, req?: Request) => {
	if (!value) {
		throw new CommonGatewayError(StatusCodes.UNAUTHORIZED, 'Access Denied', 'Error');
	}

	if (!value.startsWith('Bearer ')) {
		throw new CommonGatewayError(StatusCodes.BAD_REQUEST, 'Token format wrong', 'Error');
	}

	try {
		const _token = value.split(' ')[1];

		const token = await verifyToken({
			token: _token,
			secretOrPublicKey: config.CLIENT_GATEWAY_SECRET_KEY
		});

		if (req) {
			(req as Request).jwtClientGatewayDecoded = token;

			mainAxiosService.updateAuthorizationHeader({
				'x-user-active': token.user_verify_status.toString(),
				'x-user-id': token.user_id.toString(),
				'x-user-role': token.role_id.toString()
			});

			return true;
		}

		return _token;
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			throw new CommonGatewayError(StatusCodes.UNAUTHORIZED, error.message, 'Error');
		}
		// Rethrow the error to handle other cases correctly
		throw error;
	}
};
