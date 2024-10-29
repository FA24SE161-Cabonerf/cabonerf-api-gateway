export interface CreateImpactCategoryReqBody {
	name: string;
	indicator: string;
	indicatorDescription: string;
	unit: string;
	midpointImpactCategoryId: string;
	emissionCompartmentId: string;
}
