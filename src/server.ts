import config from '@gateway/config';
import { BASE_PATH_V1 } from '@gateway/constants/basePath';
import { CommonGatewayError } from '@gateway/errors/gateway.errors';
import { infoMessage } from '@gateway/log/message.log';
import authRoute from '@gateway/routes/auth.routes';
import emissionCompartmentRoute from '@gateway/routes/emissisonCompartment.routes';
import healthRoute from '@gateway/routes/health.routes';
import impactCategoryRoute from '@gateway/routes/impactCategory.routes';
import impactMethodRoute from '@gateway/routes/impactMethod.routes';
import lifeCycleStagesRoute from '@gateway/routes/lifeCycleStages.routes';
import projectRoute from '@gateway/routes/project.routes';
import { SocketIOHandler } from '@gateway/socket/socket.io';
import { AxiosError } from 'axios';
import compression from 'compression';
import cors from 'cors';
import { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import { Server } from 'socket.io';
import { YSocketIO } from 'y-socket.io/dist/server';
import connectorRoute from './routes/connector.routes';
import contractRoute from './routes/contracts.routes';
import emissionSubstanceRoute from './routes/emissionSubstance.routes';
import exchangeRoute from './routes/exchange.routes';
import midpointCategoryRoute from './routes/midpointCategory.routes';
import midpointFactorRoute from './routes/midpointFactors.routes';
import organizationRoute from './routes/organization.routes';
import perspectiveRoute from './routes/perspective.routes';
import processRoute from './routes/process.routes';
import unitRoute from './routes/unit.routes';
import unitGroupRoute from './routes/unitGroup.routes';
import usersRoute from './routes/users.routes';

import industryCodeRoute from '@gateway/routes/industryCode.routes';
import datasetRoute from './routes/dataset.routes';
import objectLibraryRoute from './routes/objectLibrary.routes';
import systemBoundaryRoute from './routes/systemBoundary.routes';

export class GatewayServer {
	public start(app: Application) {
		this.initServer(app);
		this.initStandardMiddleware(app);
		this.initSecurityMiddleware(app);
		this.initRoutes(app);
		this.initErrorHandler(app);
	}

	private initYSocketIo(io: Server) {
		const ysocketio = new YSocketIO(io);
		ysocketio.initialize();
	}

	private initStandardMiddleware(_app: Application) {
		_app.use(compression());
		_app.use(json({ limit: '200mb' }));
		_app.use(urlencoded({ extended: true, limit: '200mb' }));
	}

	private initSecurityMiddleware(_app: Application) {
		_app.set('trust proxy', 1);
		_app.use(
			cors({
				origin: '*',
				credentials: true,
				methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
			})
		);

		_app.use(helmet());
		_app.use(hpp());
	}

	private initRoutes(_app: Application) {
		_app.use(BASE_PATH_V1, healthRoute.routes());
		_app.use(BASE_PATH_V1, authRoute.routes());
		_app.use(BASE_PATH_V1, impactMethodRoute.routes());
		_app.use(BASE_PATH_V1, impactCategoryRoute.routes());
		_app.use(BASE_PATH_V1, projectRoute.routes());
		_app.use(BASE_PATH_V1, midpointFactorRoute.routes());
		_app.use(BASE_PATH_V1, midpointCategoryRoute.routes());
		_app.use(BASE_PATH_V1, lifeCycleStagesRoute.routes());
		_app.use(BASE_PATH_V1, perspectiveRoute.routes());
		_app.use(BASE_PATH_V1, unitRoute.routes());
		_app.use(BASE_PATH_V1, unitGroupRoute.routes());
		_app.use(BASE_PATH_V1, processRoute.routes());
		_app.use(BASE_PATH_V1, exchangeRoute.routes());
		_app.use(BASE_PATH_V1, emissionCompartmentRoute.routes());
		_app.use(BASE_PATH_V1, connectorRoute.routes());
		_app.use(BASE_PATH_V1, organizationRoute.routes());
		_app.use(BASE_PATH_V1, contractRoute.routes());
		_app.use(BASE_PATH_V1, usersRoute.routes());
		_app.use(BASE_PATH_V1, emissionSubstanceRoute.routes());
		_app.use(BASE_PATH_V1, objectLibraryRoute.routes());
		_app.use(BASE_PATH_V1, systemBoundaryRoute.routes());
		_app.use(BASE_PATH_V1, datasetRoute.routes());
		_app.use(BASE_PATH_V1, industryCodeRoute.routes());
	}

	private initErrorHandler(_app: Application) {
		_app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
			if (err instanceof AxiosError) {
				res.status(err.status ?? 400).json(err.response?.data);
			} else if (err instanceof CommonGatewayError) {
				res.status(err.status).json(err);
			}
		});
	}

	private startSocketIO(io: Server): void {
		const socketIOApp = new SocketIOHandler(io);
		socketIOApp.listen();
	}

	private initSocketIO(http: http.Server) {
		const io = new Server(http, {
			cors: {
				origin: '*'
			}
		});
		this.startSocketIO(io);
		this.initYSocketIo(io);
	}

	private async initServer(_app: Application): Promise<void> {
		try {
			const httpServer: http.Server = new http.Server(_app);
			await this.startServer(httpServer);
			await this.initSocketIO(httpServer);
		} catch (error) {
			console.log(error);
			// log.error(infoMessage({ service: 'Server', content: error as string }));
		}
	}

	private async startServer(httpServer: http.Server): Promise<void> {
		try {
			console.log(infoMessage({ service: 'Server', content: `has work on pid ${process.pid}` }));

			httpServer.listen(config.SERVER_PORT, () => {
				console.log(infoMessage({ service: 'Server', content: `running on port ${config.SERVER_PORT}` }));
			});
		} catch (error) {
			console.log(infoMessage({ service: 'Server', content: error as string }));
		}
	}
}
