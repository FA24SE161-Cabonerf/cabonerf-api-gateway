export interface CommonResponse<T> {
	status: string;
	message: string;
	data: T;
}

export class GatewayResponse<T> {
	status: string;
	message: string;
	data: T;

	constructor({ status, message, data }: { status: string; message: string; data: T }) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
}

export interface ParamID {
	id: string;
}
