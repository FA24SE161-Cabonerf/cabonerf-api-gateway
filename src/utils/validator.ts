import { CommonGatewayError } from '@gateway/errors/gateway.errors';
import { NextFunction, Request, Response } from 'express';
import { Location, ValidationChain, validationResult } from 'express-validator';
import { checkSchema, RunnableValidationChains, Schema } from 'express-validator/lib/middlewares/schema';
import { StatusCodes } from 'http-status-codes';

export const validator = (schemaChain: Schema, location?: Location[] | undefined) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		const runnableSchema: RunnableValidationChains<ValidationChain> = checkSchema(schemaChain, location);

		await runnableSchema.run(req);

		const errors = await validationResult(req);
		if (errors.isEmpty()) {
			next();
		}

		const errorsObject = errors.mapped();

		const entityError = new CommonGatewayError(StatusCodes.UNAUTHORIZED, {}, 'Error');

		for (const key in errorsObject) {
			if (errorsObject[key].msg instanceof CommonGatewayError) {
				entityError.data[key] = errorsObject[key].msg.data;
			}
			return next(entityError);
		}
	};
};
