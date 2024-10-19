import { JWTPayload } from '@gateway/types/jwt.type';
import 'express';

declare module 'express' {
	interface Request {
		jwtClientGatewayDecoded?: JWTPayload;
	}
}
