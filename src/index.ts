import { GatewayServer } from '@gateway/server';
import express, { Express } from 'express';

class Application {
	init() {
		const app: Express = express();
		const gatewayServer: GatewayServer = new GatewayServer();
		gatewayServer.start(app);
	}
}

const application: Application = new Application();
application.init();
