import config from '@gateway/config';
import { BASE_PATH_V1 } from '@gateway/constants/basePath';
import elasticSearch from '@gateway/elasticsearch';
import { CommonGatewayError } from '@gateway/errors/gateway.errors';
import { infoMessage } from '@gateway/log/message.log';
import authRoute from '@gateway/routes/auth.routes';
import healthRoute from '@gateway/routes/health.routes';
import impactCategoryRoute from '@gateway/routes/impactCategory.routes';
import impactMethodRoute from '@gateway/routes/impactMethod.routes';
import lifeCycleStagesRoute from '@gateway/routes/lifeCycleStages.routes';
import midpointCategoryRoute from './routes/midpointCategory.routes';
import projectRoute from '@gateway/routes/project.routes';
import midpointFactorRoute from './routes/midpointFactors.routes';
import perspectiveRoute from './routes/perspective.routes';
import unitRoute from './routes/unit.routes';
import unitGroupRoute from './routes/unitGroup.routes';
import { winstonLogger } from '@gateway/winston';
import { AxiosError } from 'axios';
import compression from 'compression';
import cors from 'cors';
import { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import { Logger } from 'winston';
import processRoute from './routes/process.routes';
import { Server } from 'socket.io';
import { SocketIOHandler } from '@gateway/socket/socket.io';
import exchangeRoute from './routes/exchange.routes';
import emissionCompartmentRoute from '@gateway/routes/emissisonCompartment.routes';
import connectorRoute from './routes/connector.routes';
import organizationRoute from './routes/organization.routes';
import contractRoute from './routes/contracts.routes';
import usersRoute from './routes/users.routes';
import emissionSubstanceRoute from './routes/emissionSubstance.routes';
import { YSocketIO } from 'y-socket.io/dist/server';

import objectLibraryRoute from './routes/objectLibrary.routes';
import systemBoundaryRoute from './routes/systemBoundary.routes';
import datasetRoute from './routes/dataset.routes';
import industryCodeRoute from '@gateway/routes/industryCode.routes';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'Gateway', 'debug');

const allowedOrigins = [config.CLIENT_URL, 'http://localhost:5174'];

export class GatewayServer {
	public start(app: Application) {
		this.initServer(app);
		this.initElasticsearch();
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
				origin: (origin, callback) => {
					if (!origin || allowedOrigins.includes(origin)) {
						callback(null, true);
					} else {
						callback(new Error('Not allowed by CORS'));
					}
				},
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

	private async initElasticsearch() {
		await elasticSearch.checkConnection();
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
				origin: 'http://localhost:5173'
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
			log.error(infoMessage({ service: 'Server', content: error as string }));
		}
	}

	private async startServer(httpServer: http.Server): Promise<void> {
		try {
			log.info(infoMessage({ service: 'Server', content: `has work on pid ${process.pid}` }));
			httpServer.listen(config.SERVER_PORT, () => {
				log.info(infoMessage({ service: 'Server', content: `running on port ${config.SERVER_PORT}` }));
			});
		} catch (error) {
			log.error(infoMessage({ service: 'Server', content: error as string }));
		}
	}
}
