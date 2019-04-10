import io, { Server } from 'socket.io';
import { Server as HttpServer, IncomingHttpHeaders } from 'http';

export class Socket {
  private server: Server;
  private rooms: any[] = [];

  constructor(server: HttpServer) {
    this.server = io(server);
    this.inicialize();
    console.log('here');
  }

  inicialize() {
    const that = this;
    this.server.on('connect', socket => {
      const userId = socket.handshake.query['userId'];
      socket.join(userId);
      console.log('asd');
      that.rooms.push(userId);
      that.rooms.map(i => {
        socket.on('message', function(data) {
          console.log(data);
          socket.rooms;
          socket.to(i.to).emit('message', {
            data: data
          });
        });
      });

      this.server.sockets.emit('hi', 'everyone');
    });
  }

  listen() {}
}
