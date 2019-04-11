import io, { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export class Socket {
  private server: Server;
  private mapping: Map<String, string> = new Map();

  constructor(server: HttpServer) {
    this.server = io(server);
    this.inicialize();
  }

  inicialize() {
    this.server.on('connect', socket => {
      const userId = socket.handshake.query['userId'];

      this.mapping.set(userId, socket.id);

      socket.on('send', data => {
        const users = data.to.split(',');
        users.forEach((user: string) => {
          socket.to(<string>this.mapping.get(user)).emit('messages', {
            message: data.data,
            from: data.from
          });
        });

        socket.emit('self', {
          message: data.data,
          from: userId
        });
      });
    });
  }
}
