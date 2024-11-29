import OrganizationService from '@gateway/services/cabonerf-main/organization.service';
import { ParamID } from '@gateway/types/common.types';
import { Request, Response } from 'express';
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
}
