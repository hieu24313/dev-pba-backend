import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // Lưu trữ danh sách room
  private rooms: Map<string, Set<string>> = new Map();

  // Tham gia room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket
  ) {
    console.log(`Client ${client.id} joining room ${room}`);
    client.join(room);

    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }
    this.rooms.get(room).add(client.id);

    // Phát thông báo đến các thành viên trong room
    this.server.to(room).emit('message', {
      sender: 'system',
      message: `${client.id} joined ${room}`,
    });

    console.log(`Current rooms: ${JSON.stringify([...this.rooms])}`);
    return { event: 'joinRoom', room, clientId: client.id };
  }

  // Gửi tin nhắn
  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() data: { message: string; room: string },
    @ConnectedSocket() client: Socket
  ) {
    const { message, room } = data;
    console.log(
      `Client ${client.id} sending message to room ${room}: ${message}`
    );

    if (!this.rooms.has(room)) {
      console.error(`Room ${room} does not exist`);
      return { error: `Room ${room} does not exist` };
    }

    // Gửi tin nhắn đến room
    this.server.to(room).emit('message', {
      sender: client.id,
      message,
    });

    return { event: 'sendMessage', room, message };
  }
}
