import { Connector } from '@gateway/types/connector.types';
import { Process } from '@gateway/types/process.types';

interface Project {
	id: string;
	name: string;
	description: string;
	location: string;
	method: {
		id: string;
		name: string;
		version: string;
		perspective: {
			id: string;
			name: string;
			abbr: string;
		};
	};
	impacts: [];
	processes: Process[];
	connectors: Connector[];
}

interface CreateProjectReqBody {
	name: string;
	description: string;
	location: string;
	methodId: number;
	organizationId: string;
}

interface UpdateProjectReqBody {
	description?: string;
	name?: string;
	location?: string;
}

interface GetAllProjectsReqParams {
	pageCurrent?: string;
	pageSize?: string;
	methodId?: string;
	organizationId: string;
}

export { CreateProjectReqBody, UpdateProjectReqBody, Project, GetAllProjectsReqParams };
