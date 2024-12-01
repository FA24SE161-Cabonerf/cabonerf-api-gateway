import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

interface SearchObjectLibraryReqParams extends PaginationRequest {
	keyword?: string;
	methodId: string;
}

export type { SearchObjectLibraryReqParams };
