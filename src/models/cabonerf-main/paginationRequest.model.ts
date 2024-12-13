interface PaginationRequest {
	currentPage: number;
	pageSize: number;
}

interface PaginationKeywordRequest {
	pageCurrent: number;
	pageSize: number;
	keyword?: string;
}

interface PageCurrentRequest {
	pageCurrent: number;
	pageSize: number;
}

export { PaginationRequest, PaginationKeywordRequest, PageCurrentRequest };
