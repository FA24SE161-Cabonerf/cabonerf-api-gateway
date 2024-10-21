import { verifyAccessToken } from '@gateway/utils/jwt';
import { validator } from '@gateway/utils/validator';
import { Request } from 'express';
import { Schema } from 'express-validator';

const accessTokenSchema: Schema = {
	Authorization: {
		custom: {
			options: async (value: string, { req }) => {
				return await verifyAccessToken(value, req as Request);
			}
		}
	}
};

const validatorAccessToken = validator(accessTokenSchema, ['headers']);

export { validatorAccessToken };
