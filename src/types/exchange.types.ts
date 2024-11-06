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

export type { CreateProductExchangeReqBody, CreateElementaryExchangeReqBody };
