interface PagingRequestParams {
	pageCurrent: string;
	pageSize: string;
	keyword?: string;
}

interface UpdateUserProfileReqBody {
	fullName: string;
	phone: string;
	profilePictureUrl?: string;
	bio: string;
}

export type { PagingRequestParams, UpdateUserProfileReqBody };
