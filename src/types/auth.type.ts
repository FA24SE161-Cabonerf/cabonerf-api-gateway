import { User } from '@gateway/models/cabonerf-main/user.model';

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

type LoginResponse = AuthResponse<Omit<User, 'phone' | 'bio' | 'userVerifyStatus'>>;
type RegisterResponse = LoginResponse;

export { AuthResponse, LoginReqBody, LoginResponse, RegisterReqBody, RegisterResponse, LogoutReqBody };
