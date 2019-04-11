require('dotenv').config();
import express from 'express';
import { Server } from 'http';
import Database from './connection';
import cors from 'cors';

import routes from './routes';
import { WebSocket } from './socket/websocket';
import { Socket } from './socket/socket';

import routes from './routes';
import { WebSocket } from './socket/websocket';

class App {
  public App: express.Application;
  public server: Server;

  constructor() {
    this.App = express();
    this.server = new Server(this.App);
    this.App.use(express.json());
    // this.database();
    this.applicationPort();
    // this.routes();
    this.connectionWebSocket();
    this.unlockCors();
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
    new Socket(this.server);
  }

  unlockCors() {
    this.App.use(cors({ origin: '*' }));
  }
}

new App();
