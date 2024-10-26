interface CreateProjectReqBody {
	name: string;
	description: string;
	location: string;
	methodId: number;
	workspaceId: number;
}

interface UpdateProjectReqBody {
	description?: string;
	name?: string;
	location?: string;
}

export { CreateProjectReqBody, UpdateProjectReqBody };
