import { ParamID } from '@gateway/types/common.types';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { Request, Response } from 'express';
import { UsersService } from '@gateway/services/cabonerf-main/users.service';
import { PagingRequestParams } from '@gateway/types/users.types';
import { isUndefined, omitBy } from 'lodash';

type QueryConfig = {
	[key in keyof PagingRequestParams]: string;
};

export default class UsersController {
	public async getAllUsersForAdmin(_req: Request<ParamsDictionary, any, any, PagingRequestParams>, res: Response) {
		const queryParams: QueryConfig = _req.query;

		const params: QueryConfig = omitBy(
			{
				pageCurrent: queryParams.pageCurrent || '1',
				pageSize: queryParams.pageSize || '5',
				keyword: queryParams.keyword
			},
			isUndefined
		) as QueryConfig;

		const result = await UsersService.prototype.getAllUsersForAdmin({ ...params });
		return res.status(result.status).json(result.data);
	}

	public async updateUserStatus(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await UsersService.prototype.updateUserStatus(id);
		return res.status(result.status).json(result.data);
	}
}
