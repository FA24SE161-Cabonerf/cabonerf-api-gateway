interface Perspective {
	id: number;
	name: string;
	description: string;
	abbr: string;
}

interface ImpactMethod {
	id: number;
	name: string;
	description: string;
	version: string;
	reference: string;
	perspective: ImpactMethod;
}

export { Perspective, ImpactMethod };
