import io, { Server } from 'socket.io';
import { Server as HttpServer, IncomingHttpHeaders } from 'http';

export class Socket {
  private server: Server;
  private rooms: any[] = [];

  constructor(server: HttpServer) {
    this.server = io(server);
    this.inicialize();
  }

  inicialize() {
    const that = this;
    this.server.on('connect', socket => {
      const userId = socket.handshake.query['userId'];
      socket.join(userId);

      console.log(userId);

      that.rooms.push(userId);
      socket.on('send', function(data) {
        console.log('Convidado:', data.to);
        console.log('User:', userId);
        console.log('Usuarios na sala:', that.rooms);
        socket.to(data.to).emit('messages', {
          message: data.data,
          from: data.from
        });
        socket.emit('self', {
          message: data.data,
          from: userId
        });

        // that.rooms.map(i => {
        //   console.log('Usuarios na sala:', that.rooms);

        //   });
      });

      this.server.sockets.emit('hi', 'everyone');
    });
  }

  listen() {}
}
