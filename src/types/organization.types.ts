import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

interface GetAllForManagerReqParams extends PaginationRequest {
	keyword?: string;
}

interface InviteUserToOrganizationReqBody {
	organizationId: string;
	userIds: string[];
}

interface AcceptInviteReqQuery {
	userOrganizationId: string;
	token: string;
}

interface CreateOrganizationReqParams {
	name: string;
	email: string;
}

export type { GetAllForManagerReqParams, InviteUserToOrganizationReqBody, AcceptInviteReqQuery, CreateOrganizationReqParams };
