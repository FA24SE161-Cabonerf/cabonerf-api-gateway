interface Process {
	id: string;
	name: string;
	description: null;
	lifeCycleStage: {
		id: string;
		name: string;
		description: string;
		iconUrl: string;
	};
	projectId: string;
	overallProductFlowRequired: number;
	impacts: never[];
	exchanges: never[];
}

interface UpdateProcessReqBody {
	name: string;
	description: string;
	lifeCycleStagesId: string;
}

export type { Process, UpdateProcessReqBody };
