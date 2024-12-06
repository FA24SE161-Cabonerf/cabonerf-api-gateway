import config from '@gateway/config';
import { CabonerfNodeReqBody } from '@gateway/types/cabonerfNode.types';
import { CreateConnectorReqBody } from '@gateway/types/connector.types';
import { Server } from 'socket.io';
import { io as IOCLient, Socket as SocketClient } from 'socket.io-client';

let nodebasedClient: SocketClient;

export class SocketIOHandler {
	private io: Server;
	private user_conn: Map<
		string,
		Array<{
			userId: string;
			userName: string;
			userAvatar: string;
			projectId: string;
		}>
	>;

	constructor(io: Server) {
		this.user_conn = new Map<
			string,
			Array<{
				userId: string;
				userName: string;
				userAvatar: string;
				projectId: string;
			}>
		>();
		this.io = io;
		this.startNodebasedServiceSocketConnection();
	}

	public listen(): void {
		this.io.on('connection', (socket) => {
			/**
			 ** Handle an user join room
			 * @on gateway:join-room
			 * @emit nodebased:join-room
			 */
			socket.on('gateway:join-room', (data: { userId: string; userName: string; userAvatar: string; projectId: string }) => {
				socket.join(data.projectId);
				console.log('JOIN SUCCESS GATEWAY');
				nodebasedClient.emit('nodebased:join-room', { projectId: data.projectId });

				if (!this.user_conn.has(data.projectId)) {
					this.user_conn.set(data.projectId, []);
				}

				// Lấy danh sách người dùng hiện tại trong projectId
				const users = this.user_conn.get(data.projectId);

				users?.push({
					userId: data.userId,
					userName: data.userName,
					userAvatar: data.userAvatar,
					projectId: data.projectId
				});

				this.user_conn.set(data.projectId, users || []);

				const usersInsideProject = this.user_conn.get(data.projectId);
				console.log(usersInsideProject);

				socket.to(data.projectId).emit('gateway:user-connect-to-project', usersInsideProject);
				socket.emit('gateway:user-connect-to-project', usersInsideProject);
			});

			/**
			 ** Handle an user leave room
			 * @on gateway:leave-room
			 * @emit nodebased:leave-room
			 */
			socket.on('gateway:user-leave-room', (data: { userId: string; projectId: string }) => {
				socket.leave(data.projectId);
				nodebasedClient.emit('nodebased:leave-room', data.projectId);
				// Lấy danh sách người dùng hiện tại trong projectId
				const users = this.user_conn.get(data.projectId);

				this.user_conn.set(data.projectId, users?.filter((item) => item.userId !== data.userId) || []);

				const usersInsideProject = this.user_conn.get(data.projectId);

				socket.to(data.projectId).emit('gateway:user-leave-room-success', usersInsideProject);
			});

			/**
			 ** Create new process
			 * @on gateway:cabonerf-node-create
			 * @emit nodebased:cabonerf-node-create
			 */
			socket.on('gateway:cabonerf-node-create', (data: { data: CabonerfNodeReqBody; projectId: string }) => {
				if (data) {
					console.log('LINE 38 projectId', data.projectId);
					nodebasedClient.emit('nodebased:cabonerf-node-create', { data: data.data, projectId: data.projectId });
				}
			});

			/**
			 ** Delete process
			 * @on gateway:cabonerf-node-delete
			 * @emit nodebased:cabonerf-node-delete
			 */
			socket.on('gateway:cabonerf-node-delete', (data: { data: string; projectId: string }) => {
				if (data) {
					nodebasedClient.emit('nodebased:cabonerf-node-delete', data);
				}
			});

			/**
			 ** Update position process
			 * @on gateway:cabonerf-node-update-position
			 * @emit nodebased:node-update-position
			 */
			socket.on('gateway:node-update-position', (data: { data: { id: string; x: number; y: number }; projectId: string }) => {
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
			socket.on('gateway:node-update-color', (data: { data: { id: string; color: string }; projectId: string }) => {
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
			socket.on('gateway:connector-delete', (data: { data: string; projectId: string }) => {
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

		nodebasedClient.on('nodebased:create-process-success', (data: { data: any; projectId: string }) => {
			console.log('LINE 116: VAO LAI NODEBASED');
			this.io.to(data.projectId).emit('gateway:create-process-success', data.data);
			this.io.emit('gateway:create-process-success-self', data.data);
		});

		nodebasedClient.on('nodebased:delete-process-success', (data: { data: any; projectId: string }) => {
			this.io.to(data.projectId).emit('gateway:delete-process-success', data.data);
			this.io.emit('gateway:delete-process-success', data.data);
		});

		nodebasedClient.on('nodebased:update-process-color-success', (data: { data: any; projectId: string }) => {
			this.io.emit('gateway:update-process-color-success', data.data);
			this.io.to(data.projectId).emit('gateway:update-process-color-success', data.data);
		});

		nodebasedClient.on('nodebased:connector-created', (data: { data: any; projectId: string }) => {
			this.io.emit('gateway:connector-created', data.data);
			// this.io.to(data.projectId).emit('gateway:connector-created', data.data);
		});

		nodebasedClient.on('nodebased:error-create-edge', (data) => {
			this.io.emit('gateway:error-create-edge', data);
		});

		nodebasedClient.on('nodebased:connector-deleted', (data: { data: any; projectId: string }) => {
			this.io.emit('gateway:connector-deleted', data.data);
			// this.io.to(data.projectId).emit('gateway:connector-deleted', data.data);
		});

		nodebasedClient.on('nodebased:delete-connector-ids', (data) => {
			this.io.emit('gateway:delete-connector-ids', data);
		});
	}
}
