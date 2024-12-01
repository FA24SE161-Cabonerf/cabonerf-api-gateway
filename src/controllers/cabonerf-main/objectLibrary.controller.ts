import ObjectLibraryService from '@gateway/services/cabonerf-main/objectLibrary.service';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParamID } from '@gateway/types/common.types';
import { Request, Response } from 'express';
import { SearchObjectLibraryReqParams } from '@gateway/types/objectLibrary.types';

export default class ObjectLibraryController {
	public async searchObjectLibraryOfOrganization(_req: Request<ParamsDictionary, any, any, SearchObjectLibraryReqParams>, res: Response) {
		const { id } = _req.params;
		const SearchObjectLibraryReqParams = _req.query;
		const result = await ObjectLibraryService.prototype.searchObjectLibraryOfOrganization(id, SearchObjectLibraryReqParams);
		return res.status(result.status).json(result.data);
	}

	public async saveToObjectLibrary(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await ObjectLibraryService.prototype.saveToObjectLibrary(id);
		return res.status(result.status).json(result.data);
	}

	public async removeFromObjectLibrary(_req: Request<ParamID, any, any>, res: Response) {
		const { id } = _req.params;
		const result = await ObjectLibraryService.prototype.removeFromObjectLibrary(id);
		return res.status(result.status).json(result.data);
	}

	public async addFromObjectLibraryToProject(_req: Request<{ processId: string; projectId: string }, any, any>, res: Response) {
		const { processId, projectId } = _req.params;
		const result = await ObjectLibraryService.prototype.addFromObjectLibraryToProject(processId, projectId);
		return res.status(result.status).json(result.data);
	}
}
