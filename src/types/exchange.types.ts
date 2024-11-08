interface CreateProductExchangeReqBody {
	processId: string;
	name: string;
	input: boolean;
}

interface CreateElementaryExchangeReqBody {
	processId: string;
	substanceCompartmentId: string;
	input: boolean;
}

interface SearchElementaryQuery {
	pageCurrent: string;
	pageSize: string;
	methodId: string;
	input: string;
	keyword?: string;
	emissionCompartmentId?: string;
	impactCategoryId?: string;
}
export type { CreateProductExchangeReqBody, CreateElementaryExchangeReqBody, SearchElementaryQuery };
