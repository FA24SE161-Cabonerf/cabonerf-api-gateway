import OrganizationService from '@gateway/services/cabonerf-main/organization.service';
import { ParamID, GatewayResponse } from '@gateway/types/common.types';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core/index';
import {
	GetAllForManagerReqParams,
	InviteUserToOrganizationReqBody,
	AcceptInviteReqQuery,
	CreateOrganizationReqParams
} from '@gateway/types/organization.types';
import log from '@gateway/utils/logger';

export default class OrganizationController {
	public async getUserOrganization(_req: Request, res: Response) {
		log.info('getUserOrganization: ');
		const result = await OrganizationService.prototype.getUserOrganization();
		return res.status(result.status).json(result.data);
	}

	public async getOrganizationById(_req: Request<ParamID, any, any>, res: Response) {
		log.info('getOrganizationById: ');

		const { id } = _req.params;
		const result = await OrganizationService.prototype.getOrganizationById(id);
		return res.status(result.status).json(result.data);
	}

	public async getMembersInOrganization(_req: Request<ParamID, any, any>, res: Response) {
		log.info('getMembersInOrganization');
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

	public async getAllForManager(_req: Request<ParamsDictionary, unknown, any, GetAllForManagerReqParams>, res: Response) {
		const GetAllForManagerReqParams = _req.query;
		log.info('get all for manager: ', GetAllForManagerReqParams);
		const result = await OrganizationService.prototype.getAllForManager(GetAllForManagerReqParams);
		return res.status(result.status).json(result.data);
	}

	public async deleteOrganizationForManager(_req: Request<ParamID, any, any>, res: Response) {
		log.info('deleteOrganizationForManager');

		const { id } = _req.params;
		const result = await OrganizationService.prototype.deleteOrganizationForManager(id);
		return res.status(result.status).json(result.data);
	}

	public async inviteMember(_req: Request<ParamsDictionary, unknown, InviteUserToOrganizationReqBody>, res: Response) {
		const { ...rest } = _req.body;
		const result = await OrganizationService.prototype.inviteMember(rest);
		return res.status(result.status).json(result.data);
	}

	public async acceptInvite(_req: Request<ParamsDictionary, unknown, unknown, AcceptInviteReqQuery>, res: Response) {
		const data = _req.query;
		const result = await OrganizationService.prototype.acceptInvite(data);
		return res.status(result.status).json(result.data);
	}

	public async removeMember(_req: Request<ParamID>, res: Response) {
		const { id } = _req.params;
		const result = await OrganizationService.prototype.removeMember(id);
		return res.status(result.status).json(result.data);
	}

	public async createOrganization(
		_req: Request<ParamsDictionary, unknown, CreateOrganizationReqParams, CreateOrganizationReqParams>,
		res: Response
	) {
		const data = _req.body;
		const files = _req.files as { [fieldname: string]: Express.Multer.File[] };
		const contractFile = files['contractFile'][0];
		const logo = files['logo'][0];

		if (!contractFile) {
			return res.status(StatusCodes.BAD_REQUEST).json(
				new GatewayResponse({
					status: 'Error',
					message: 'Contract file is not present.',
					data: []
				})
			);
		}

		if (!logo) {
			return res.status(StatusCodes.BAD_REQUEST).json(
				new GatewayResponse({
					status: 'Error',
					message: 'Logo is not present.',
					data: []
				})
			);
		}

		const result = await OrganizationService.prototype.createOrganization(data, contractFile, logo);
		return res.status(result.status).json(result.data);
	}

	public async leaveOrganization(_req: Request<{ userOrganizationId: string }, any, any>, res: Response) {
		const { userOrganizationId } = _req.params;
		const result = await OrganizationService.prototype.leaveOrganization(userOrganizationId);
		return res.status(result.status).json(result.data);
	}

	public async inviteMember2(_req: Request<ParamsDictionary, unknown, { email: string; organizationId: string }>, res: Response) {
		const { email, organizationId } = _req.body;
		const result = await OrganizationService.prototype.inviteMem({ email, organizationId });

		return res.status(result.status).json(result.data);
	}
}
