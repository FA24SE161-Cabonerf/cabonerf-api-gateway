import { ParamID, GatewayResponse } from '@gateway/types/common.types';
import { ParamsDictionary } from 'express-serve-static-core/index';
import { Request, Response } from 'express';
import { UsersService } from '@gateway/services/cabonerf-main/users.service';
import { PagingRequestParams } from '@gateway/types/users.types';
import { isUndefined, omitBy } from 'lodash';
import { UpdateUserProfileReqBody } from '@gateway/types/users.types';
import { StatusCodes } from 'http-status-codes';
import { PaginationKeywordRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

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

	public async updateUserProfile(_req: Request<ParamsDictionary, any, any, UpdateUserProfileReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await UsersService.prototype.updateUserProfile(rest);
		return res.status(result.status).json(result.data);
	}

	public async updateUserAvatar(_req: Request, res: Response) {
		const image = _req.file;
		if (!image) {
			return res.status(StatusCodes.BAD_REQUEST).json(
				new GatewayResponse({
					status: 'Error',
					message: 'Image is not present',
					data: []
				})
			);
		}
		const result = await UsersService.prototype.updateUserAvatar(image.buffer);
		return res.status(result.status).json(result.data);
	}

	public async getUserToInvite(_req: Request<ParamsDictionary, any, any, PaginationKeywordRequest>, res: Response) {
		const query = _req.query;
		const result = await UsersService.prototype.getUserToInvite(query);
		return res.status(result.status).json(result.data);
	}

	public async getUserInDashboard(_req: Request, res: Response) {
		const result = await UsersService.prototype.getUserInDashboard();
		return res.status(result.status).json(result.data);
	}

	public async countAllUser(_req: Request, res: Response) {
		const result = await UsersService.prototype.countAllUser();
		return res.status(result.status).json(result.data);
	}
}
