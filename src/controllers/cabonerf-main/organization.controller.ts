import OrganizationService from '@gateway/services/cabonerf-main/organization.service';
import { ParamID, GatewayResponse } from '@gateway/types/common.types';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class OrganizationController {
	public async getUserOrganization(_req: Request, res: Response) {
		const result = await OrganizationService.prototype.getUserOrganization();
		return res.status(result.status).json(result.data);
	}

	public async getAllByOrganization(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await OrganizationService.prototype.getAllByOrganization(id);
		return res.status(result.status).json(result.data);
	}

	public async getMembersInOrganization(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await OrganizationService.prototype.getMembersInOrganization(id);
		return res.status(result.status).json(result.data);
	}

	public async getListMemberInvited(_req: Request, res: Response) {
		const result = await OrganizationService.prototype.getListMemberInvited();
		return res.status(result.status).json(result.data);
	}

	public async uploadLogo(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const logo = _req.file;
		if (!logo) {
			return res.status(StatusCodes.BAD_REQUEST).json(
				new GatewayResponse({
					status: 'Error',
					message: 'Logo is not present.',
					data: []
				})
			);
		}
		const result = await OrganizationService.prototype.uploadLogo(id, logo.buffer);
		return res.status(result.status).json(result.data);
	}
}
