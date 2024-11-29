import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

interface GetAllForManagerReqParams extends PaginationRequest {
	keyword?: string;
}

export type { GetAllForManagerReqParams };
