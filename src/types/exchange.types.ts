interface CreateProductExchangeReqBody {
	processId: string;
	name: string;
	input: boolean;
}

interface CreateElementaryExchangeReqBody {
	processId: string;
	emissionSubstanceId: string;
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

interface UpdateExchangeReqBody {
	name: string;
	value: number;
	unitId: string;
	processId: string;
}
export type { CreateProductExchangeReqBody, CreateElementaryExchangeReqBody, SearchElementaryQuery, UpdateExchangeReqBody };
