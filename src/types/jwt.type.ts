export interface JWTPayload {
	user_verify_status: number;
	user_id: number;
	role_id: number;
	token_type: number;
	iat: number;
	exp: number;
}
