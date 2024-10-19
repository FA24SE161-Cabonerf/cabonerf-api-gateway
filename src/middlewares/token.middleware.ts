import config from '@gateway/config';
import { CommonGatewayError } from '@gateway/errors/gateway.errors';
import { verifyJWT } from '@gateway/utils/jwt';
import { validator } from '@gateway/utils/validator';
import { Schema } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { JsonWebTokenError } from 'jsonwebtoken';

const accessTokenSchema: Schema = {
	Authorization: {
		custom: {
			options: async (value: string, { req }) => {
				try {
					if (!value) {
						throw new CommonGatewayError(StatusCodes.UNAUTHORIZED, 'Access Denied', 'Error');
					}

					if (!value.startsWith('Bearer ')) {
						throw new CommonGatewayError(StatusCodes.BAD_REQUEST, 'Token format wrong', 'Error');
					}

					const token = await verifyJWT({ token: value, secretOrPublicKey: config.CLIENT_GATEWAY_SECRET_KEY });

					req.jwtClientGatewayDecoded = token;
				} catch (error) {
					if (error instanceof JsonWebTokenError) {
						throw new CommonGatewayError(StatusCodes.UNAUTHORIZED, error.message, 'Error');
					}
					throw error;
				}
				return true;
			}
		}
	}
};

const validatorAccessToken = validator(accessTokenSchema, ['headers']);

export { validatorAccessToken };
