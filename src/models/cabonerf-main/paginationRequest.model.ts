interface PaginationRequest {
	currentPage: number;
	pageSize: number;
}

interface PaginationKeywordRequest {
	pageCurrent: number;
	pageSize: number;
	keyword?: string;
}

export { PaginationRequest };
