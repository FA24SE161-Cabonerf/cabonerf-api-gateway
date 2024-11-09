import config from '@gateway/config';
import { CabonerfNodeReqBody } from '@gateway/types/cabonerfNode.types';
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
			const userId = socket.handshake.auth.user_id;
			this.user_conn.set(userId, socket.id);

			/**
			 ** Create new process
			 * @on gateway:cabonerf-node-create
			 * @emit nodebased:cabonerf-node-create
			 */
			socket.on('gateway:cabonerf-node-create', (data: CabonerfNodeReqBody) => {
				if (data) {
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
			this.io.emit('gateway:create-process-success', data);
		});

		nodebasedClient.on('nodebased:delete-process-success', (data) => {
			this.io.emit('gateway:delete-process-success', data);
		});
	}
}
