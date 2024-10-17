interface Role {
	id: number;
	name: string;
}

interface UserVerifyStatus {
	id: number;
	statusName: string;
	description: string;
}

interface Subscription {
	id: number;
	subscriptionName: string;
	description: string;
	projectLimit: number;
	usageLimit: number;
	annualCost: number;
	monthlyCost: number;
	canCreateOrganization: boolean;
}

interface UserStatus {
	id: number;
	statusName: string;
	description: string;
}

interface User {
	id: number;
	fullName: string;
	email: string;
	phone: null;
	profilePictureUrl: null;
	bio: null;
	role: Role;
	userVerifyStatus: UserVerifyStatus;
	subscription: Subscription;
	userStatus: User;
}

export { Role, Subscription, User, UserStatus, UserVerifyStatus };
