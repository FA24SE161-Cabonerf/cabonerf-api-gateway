import { PageCurrentRequest } from '@gateway/models/cabonerf-main/paginationRequest.model';

type IndustryCode = {
	id: string;
	name: string;
	code: string;
};

interface GetIndustryCodeReqQuery extends PageCurrentRequest {
	keyword?: string;
}

export type { IndustryCode, GetIndustryCodeReqQuery };
