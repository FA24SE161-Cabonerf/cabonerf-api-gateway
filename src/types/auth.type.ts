import { User } from '@gateway/models/user.model';

interface LoginReqBody {
	email: string;
	password: string;
}

interface AuthResponse<T> {
	access_token: string;
	refresh_token: string;
	user: T;
}

type LoginResponse = AuthResponse<Omit<User, 'phone' | 'bio' | 'userVerifyStatus'>>;

export { AuthResponse, LoginReqBody, LoginResponse };
