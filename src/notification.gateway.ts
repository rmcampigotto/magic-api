import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  afterInit() {
    setTimeout(() => {
      this.server.emit('notification', 'Teste de WebSocket: Mensagem enviada pelo servidor!');
    }, 1000);
  }

  handleNotification(message: string) {
    this.server.emit('notification', message);
  }
}
