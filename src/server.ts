require('dotenv').config();
import express from 'express';
import { Server } from 'http';
import Database from './connection';

import routes from './routes';
import { WebSocket } from './socket/websocket';

class App {
  public App: express.Application;
  public server: Server;

  constructor() {
    this.App = express();
    this.server = new Server(this.App);
    this.App.use(express.json());
    this.database();
    this.applicationPort();
    this.routes();
    this.connectionWebSocket();
  }

  private applicationPort(): void {
    // this.App.listen(process.env.SERVER_PORT);
    this.server.listen(process.env.SERVER_PORT);
  }

  private database(): void {
    const database = new Database();
  }

  private routes(): void {
    this.App.use(routes);
  }

  connectionWebSocket() {
    new WebSocket(this.server);
  }
}

new App();