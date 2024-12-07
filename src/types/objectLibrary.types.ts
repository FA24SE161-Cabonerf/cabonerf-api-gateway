import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

interface SearchObjectLibraryReqParams extends PaginationRequest {
	keyword?: string;
	systemBoundaryId?: string;
}

export type { SearchObjectLibraryReqParams };
