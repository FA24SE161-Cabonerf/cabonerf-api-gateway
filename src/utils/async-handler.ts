import { NextFunction, Request, Response } from 'express';

export const asyncHandler = (fn: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			console.log('Loi o day', error);
			next(error);
		}
	};
};
