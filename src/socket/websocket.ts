import { Server as WebSocketServer } from 'ws';
import { Server } from 'http';
import Messages from '../schemas/Messages';

export class WebSocket {
  private ws: WebSocketServer;

  constructor(server: Server) {
    this.ws = new WebSocketServer({ server });
    this.connection();
  }

  connection() {
    this.ws.on('connection', (ws, req) => {
      ws.on('message', async (message: string) => {
        const msgs = await Messages.find();
        console.log(msgs);
        this.ws.clients.forEach(client => {
          if (client != ws) {
            client.send(message);
          }
        });
      });
    });
  }
}

// const msg = await Messages.create({
//   to: '5cab6f747c0ecc20c0641bcf',
//   from: '5cab6f877c0ecc20c0641bd0',
//   message: 'help me!'
// });
