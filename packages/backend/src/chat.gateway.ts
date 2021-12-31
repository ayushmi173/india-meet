import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() data: string) {
    console.log(data);
    this.server.sockets.emit('receive_message', data);
    console.log('listen for message------->');
  }

  @SubscribeMessage('request_all_message')
  async requestAllMessage(@ConnectedSocket() socket: Socket) {
    socket.emit('send_all_messages');
  }

  afterInit(server: Server) {
    this.logger.log('Chat gateway is initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
