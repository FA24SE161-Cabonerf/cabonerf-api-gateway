import ObjectLibraryService from '@gateway/services/cabonerf-main/objectLibrary.service';
import { ParamsDictionary } from 'express-serve-static-core';
import { Request, Response } from 'express';
import { SearchObjectLibraryReqParams } from '@gateway/types/objectLibrary.types';

export default class ObjectLibraryController {
	public async searchObjectLibraryOfOrganization(_req: Request<ParamsDictionary, any, any, SearchObjectLibraryReqParams>, res: Response) {
		const { orgId } = _req.params;
		const SearchObjectLibraryReqParams = _req.query;
		const result = await ObjectLibraryService.prototype.searchObjectLibraryOfOrganization(orgId, SearchObjectLibraryReqParams);
		return res.status(result.status).json(result.data);
	}

	public async saveToObjectLibrary(_req: Request<{ projectId: string }, any, any>, res: Response) {
		const { projectId } = _req.params;
		const result = await ObjectLibraryService.prototype.saveToObjectLibrary(projectId);
		return res.status(result.status).json(result.data);
	}

	public async removeFromObjectLibrary(_req: Request<{ processId: string }, any, any>, res: Response) {
		const { processId } = _req.params;
		const result = await ObjectLibraryService.prototype.removeFromObjectLibrary(processId);
		return res.status(result.status).json(result.data);
	}

	public async addFromObjectLibraryToProject(_req: Request<{ processId: string; projectId: string }, any, any>, res: Response) {
		const { processId, projectId } = _req.params;
		const result = await ObjectLibraryService.prototype.addFromObjectLibraryToProject(processId, projectId);
		return res.status(result.status).json(result.data);
	}
}
