export interface CommonResponse<T> {
	status: string;
	message: string;
	data: T;
}
