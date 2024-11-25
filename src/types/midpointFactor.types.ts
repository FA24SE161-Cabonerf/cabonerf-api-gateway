import { PaginationRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

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

interface ExportFactorReqQuery {
	methodId: string;
	impactCategoryId: string;
}

interface GetMidpointSubstanceFactorsAdminReqParams extends PaginationRequest {
	compartmentId?: string;
	keyword?: string;
}

export type { CreateFactorReqBody, ExportFactorReqQuery, GetMidpointSubstanceFactorsAdminReqParams };
