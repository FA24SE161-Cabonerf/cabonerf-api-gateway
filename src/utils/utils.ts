import { JWTPayload } from '@gateway/types/jwt.type';

export const authHeaders = (encodedJWT: JWTPayload) => {
	return {
		'x-user-id': encodedJWT.user_id,
		'x-user-role': encodedJWT.role_id,
		'x-user-active': encodedJWT.user_verify_status
	};
};
