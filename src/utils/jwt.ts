import { CommonGatewayError } from '@gateway/errors/gateway.errors';
import { JWTPayload } from '@gateway/types/jwt.type';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const verifyBearer = (_token: string) => {
	const [bearer, token] = _token.split(' ');

	if (!bearer || bearer !== 'Bearer') {
		throw new CommonGatewayError(StatusCodes.UNPROCESSABLE_ENTITY, { message: 'Token is invalid' }, 'Error');
	}

	return token;
};

export const verifyJWT = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: jwt.Secret }): Promise<JWTPayload> => {
	return new Promise<JWTPayload>((resolve, reject) => {
		jwt.verify(token, secretOrPublicKey, (error, decoded) => {
			if (error) {
				reject(error); // Properly reject on error
			}

			resolve(decoded as JWTPayload); // Safely resolve the promise
		});
	});
};
