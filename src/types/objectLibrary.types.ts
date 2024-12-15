import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

interface SearchObjectLibraryReqParams extends PaginationRequest {
	keyword?: string;
	systemBoundaryId?: string;
}

interface RemoveObjectLibraryReqBody {
	objectIds: string[];
}

export type { SearchObjectLibraryReqParams, RemoveObjectLibraryReqBody };
