interface EmissionCompartment {
	id: number;
	name: string;
}

interface ImpactCategoryUnitGroup {
	id: string;
	name: string;
	unitGroupType: string;
}

interface ImpactCategoryUnit {
	id: number;
	name: string;
	conversionFactor: 1;
	unitGroup: ImpactCategoryUnitGroup;
}

interface MidpointImpactCategory {
	id: number;
	name: string;
	description: string;
	abbr: string;
	unit: ImpactCategoryUnit;
}

interface ImpactCategory {
	id: number;
	name: string;
	indicator: string;
	indicatorDescription: string;
	unit: string;
	midpointImpactCategory: MidpointImpactCategory;
	emissionCompartment: EmissionCompartment;
}

export { EmissionCompartment, ImpactCategory, ImpactCategoryUnit, ImpactCategoryUnitGroup, MidpointImpactCategory };
