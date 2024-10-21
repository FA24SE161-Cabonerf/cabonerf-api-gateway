import { CommonGatewayError } from '@gateway/errors/gateway.errors';
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
			secretOrPublicKey: `2a04b96a678f2e398bc5a0bae76028d194bcbbf2bcad11d016b49178bbcad14e`
		});
		console.log('Line 46');
		if (req) {
			(req as Request).jwtClientGatewayDecoded = token;
			console.log('Line 49');
			return true;
		}
		console.log('Line 52');
		return _token;
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			throw new CommonGatewayError(StatusCodes.UNAUTHORIZED, error.message, 'Error');
		}
		// Rethrow the error to handle other cases correctly
		throw error;
	}
};
