import config from '@gateway/config';
import { CabonerfNodeReqBody } from '@gateway/types/cabonerfNode.types';
import { CreateConnectorReqBody } from '@gateway/types/connector.types';
import { Server } from 'socket.io';
import { io as IOCLient, Socket as SocketClient } from 'socket.io-client';

let nodebasedClient: SocketClient;

export class SocketIOHandler {
	private io: Server;
	private user_conn: Map<string, string>;

	constructor(io: Server) {
		this.user_conn = new Map<string, string>();
		this.io = io;
		this.startNodebasedServiceSocketConnection();
	}

	public listen(): void {
		this.io.on('connection', (socket) => {
			const { user_id } = socket.handshake.auth;

			this.user_conn.set(user_id, socket.id);

			socket.join(this.user_conn.get(socket.id) as string);

			/**
			 ** Create new process
			 * @on gateway:cabonerf-node-create
			 * @emit nodebased:cabonerf-node-create
			 */
			socket.on('gateway:cabonerf-node-create', (data: CabonerfNodeReqBody) => {
				console.log('GATEWAY', this.user_conn.get(socket.id) as string);

				if (data) {
					console.log('Vao node created2');
					nodebasedClient.auth = { user_id: this.user_conn.get(socket.id) as string };
					nodebasedClient.emit('nodebased:cabonerf-node-create', data);
				}
			});

			/**
			 ** Delete process
			 * @on gateway:cabonerf-node-delete
			 * @emit nodebased:cabonerf-node-delete
			 */
			socket.on('gateway:cabonerf-node-delete', (data: string) => {
				if (data) {
					nodebasedClient.emit('nodebased:cabonerf-node-delete', data);
				}
			});

			/**
			 ** Update position process
			 * @on gateway:cabonerf-node-update-position
			 * @emit nodebased:node-update-position
			 */
			socket.on('gateway:node-update-position', (data: { id: string; x: number; y: number }) => {
				if (data) {
					console.log('UPDATE');
					nodebasedClient.emit('nodebased:node-update-position', data);
				}
			});

			/**
			 ** Update color process
			 * @on gateway:node-update-color
			 * @emit nodebased:node-update-color
			 */
			socket.on('gateway:node-update-color', (data: { id: string; color: string }) => {
				if (data) {
					nodebasedClient.emit('nodebased:node-update-color', data);
				}
			});

			/**
			 ** Create connector (edge)
			 * @on gateway:connector-create
			 * @emit nodebased:connector-create
			 *
			 * @body {
			 * 	startProcessId: @type string
			 * 	endProcessId: @type string
			 * 	startExchangeId: @type string
			 * 	endExchangeId: @type string
			 * }
			 */
			socket.on('gateway:connector-create', (data: CreateConnectorReqBody & { projectId: string }) => {
				nodebasedClient.emit('nodebased:connector-create', data);
			});

			/**
			 ** Delete connector (edge)
			 * @on gateway:connector-delete
			 * @emit nodebased:connector-delete
			 */
			socket.on('gateway:connector-delete', (data: string) => {
				nodebasedClient.emit('nodebased:connector-delete', data);
			});
		});

		this.io.on('disconnect', (socket) => {
			this.user_conn.delete(socket.handshake.auth.user_id);
		});
	}

	public startNodebasedServiceSocketConnection() {
		nodebasedClient = IOCLient(`${config.NODEBASED_SERVICE_URL}`, {
			transports: ['websocket', 'polling']
		});

		nodebasedClient.connect();

		nodebasedClient.on('nodebased:create-process-success', (data) => {
			this.io.to(data.user_id).emit('gateway:create-process-success', data);
		});

		nodebasedClient.on('nodebased:delete-process-success', (data) => {
			this.io.emit('gateway:delete-process-success', data);
		});

		nodebasedClient.on('nodebased:update-process-color-success', (data) => {
			this.io.emit('gateway:update-process-color-success', data);
		});

		nodebasedClient.on('nodebased:connector-created', (data) => {
			this.io.emit('gateway:connector-created', data);
		});

		nodebasedClient.on('nodebased:error-create-edge', (data) => {
			this.io.emit('gateway:error-create-edge', data);
		});

		nodebasedClient.on('nodebased:connector-deleted', (data) => {
			this.io.emit('gateway:connector-deleted', data);
		});

		nodebasedClient.on('nodebased:delete-connector-ids', (data) => {
			this.io.emit('gateway:delete-connector-ids', data);
		});
	}
}
