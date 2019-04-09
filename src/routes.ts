import { Router } from 'express';

import UserController from './controllers/UserController';
import { Authentication } from './middleware/auth';

class Routes {
  private _routes: Router = Router();

  get routes() {
    this.usersRoutes();
    return this._routes;
  }

  authMiddleware() {
    this._routes.use(new Authentication().authentication);
  }

  usersRoutes() {
    this._routes.post('/users', UserController.create);
    this._routes.post('/authenticate', UserController.auth);
    this.authMiddleware();
    this._routes.get('/users', UserController.index);
    this._routes.delete('/users/:id', UserController.delete);
    this._routes.put('/user', UserController.edit);
  }
}

export default new Routes().routes;
