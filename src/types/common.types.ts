export interface CommonResponse<T> {
	status: number;
	message: string;
	data: T;
}

export class GatewayResponse<T> {
	status: number;
	message: string;
	data: T;

	constructor({ status, message, data }: { status: number; message: string; data: T }) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
}

export interface ParamID {
	id: string;
}
