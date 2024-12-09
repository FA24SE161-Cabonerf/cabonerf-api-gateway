interface CabonerfNodeReqBody {
	projectId: string;
	lifeCycleStagesId: string;
	position: {
		x: number;
		y: number;
	};
	type: string;
}

export type { CabonerfNodeReqBody };
