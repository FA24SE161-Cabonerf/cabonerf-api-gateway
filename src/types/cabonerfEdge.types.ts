interface EdgeProcess {
	id: string;
	data: {
		projectId: string;
		[key: string]: unknown;
	};
	target: string;
	source: string;
	sourceHandle: string;
	targetHandle: string;
	pathType: string;
}

export type { EdgeProcess };
