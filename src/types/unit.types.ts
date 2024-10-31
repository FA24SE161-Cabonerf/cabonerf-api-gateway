interface CreateUnitReqBody {
	unitName: string;
	conversionFactor: number;
	isDefault: boolean;
}

interface UpdateUnitReqBody {
	unitName: string;
	conversionFactor: number;
	isDefault: boolean;
	unitGroupId: string;
}

export { CreateUnitReqBody, UpdateUnitReqBody };
