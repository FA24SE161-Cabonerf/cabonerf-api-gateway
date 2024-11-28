import { User } from '@gateway/models/cabonerf-main/user.model';

interface AuthorizationHeaders {
	'x-user-id': string;
	'x-user-role': string;
	'x-user-active': string;
}

interface LoginReqBody {
	email: string;
	password: string;
}

interface RegisterReqBody {
	email: string;
	password: string;
	fullName: string;
	confirmPassword: string;
}

interface LogoutReqBody {
	refreshToken: string;
}

interface AuthResponse<T> {
	access_token: string;
	refresh_token: string;
	user: T;
}

interface ChangePasswordReqBody {
	oldPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
}

type LoginResponse = AuthResponse<Omit<User, 'phone' | 'bio' | 'userVerifyStatus'>>;
type RegisterResponse = LoginResponse;

export {
	AuthResponse,
	LoginReqBody,
	LoginResponse,
	RegisterReqBody,
	RegisterResponse,
	LogoutReqBody,
	AuthorizationHeaders,
	ChangePasswordReqBody
};
