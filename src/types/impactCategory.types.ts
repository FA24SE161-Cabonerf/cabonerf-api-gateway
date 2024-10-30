export interface BaseImpactCategoryReqBody {
	name: string;
	indicator: string;
	indicatorDescription: string;
	unit: string;
	midpointImpactCategoryId: string;
	emissionCompartmentId: string;
}
