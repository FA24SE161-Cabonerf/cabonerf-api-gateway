interface CreateFactorReqBody {
	name: string;
	chemicalName: string;
	molecularFormula: string;
	alternativeFormula: string;
	cas: string;
	value: number;
	emissionCompartmentId: string;
	methodId: string;
	categoryId: string;
	unitId: string;
	emissionSubstanceId: string;
}

export type { CreateFactorReqBody };
