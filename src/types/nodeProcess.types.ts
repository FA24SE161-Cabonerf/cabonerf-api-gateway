interface NodeProcess {
	id: string;
	data: {
		projectId: string;
		color: string;
		[key: string]: unknown;
	};
	type: string;
	position: { x: number; y: number };
	sourcePosition?: string;
	targetPosistion?: string;
	draggable?: boolean;
	selectable?: boolean;
	connectable?: boolean;
}

export type { NodeProcess };
