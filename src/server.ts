import config from '@gateway/config';
import { BASE_PATH_V1 } from '@gateway/constants/basePath';
import elasticSearch from '@gateway/elasticsearch';
import { infoMessage } from '@gateway/log/message.log';
import authenticationRoute from '@gateway/routes/auth.routes';
import healthRoute from '@gateway/routes/health.routes';
import { winstonLogger } from '@gateway/winston';
import compression from 'compression';
import cors from 'cors';
import { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'Gateway', 'debug');

export class GatewayServer {
	public start(app: Application) {
		this.initServer(app);
		this.initElasticsearch();
		this.initStandardMiddleware(app);
		this.initSecurityMiddleware(app);
		this.initRoutes(app);
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
				origin: config.CLIENT_URL,
				credentials: true,
				methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
			})
		);
		_app.use(helmet());
		_app.use(hpp());
	}

	private initRoutes(_app: Application) {
		_app.use(BASE_PATH_V1, healthRoute.routes());
		_app.use(BASE_PATH_V1, authenticationRoute.routes());
	}

	private async initElasticsearch() {
		await elasticSearch.checkConnection();
	}

	private async initServer(_app: Application): Promise<void> {
		try {
			const httpServer: http.Server = new http.Server(_app);
			await this.startServer(httpServer);
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
