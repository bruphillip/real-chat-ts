import { Request, Response } from 'express';
import { User as IUser, ModelUser } from '../models/models.interface';
import User from '../schemas/User';

class UserController {
  public async index(req: OverRequest, res: Response): Promise<Response> {
    const users = await User.find();
    try {
      return res.json(users);
    } catch (err) {
      return res.status(400).json({ error: 'Cannot search users' });
    }
  }

  public async create(req: OverRequest, res: Response): Promise<Response> {
    const user = <IUser>req.body;
    try {
      const createdUser = await User.create(user);
      const token = createdUser.generateToken();
      return res.json({ createdUser, token });
    } catch (err) {
      return res.status(400).json({ error: 'Cannot add a new user' });
    }
  }

  public async delete(req: OverRequest, res: Response): Promise<Response> {
    const userId = req.params.id;

    try {
      await User.findByIdAndDelete(userId);

      return res.send();
    } catch (err) {
      return res.status(400).json({ error: 'Cannot delete user' });
    }
  }

  public async auth(req: OverRequest, res: Response): Promise<Response> {
    const user = req.body;
    try {
      const findedUser = <ModelUser>await User.findOne({ email: user.email });
      if (!(await findedUser.compareHash(user.password))) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({ user: findedUser, token: findedUser.generateToken() });
    } catch (err) {
      return res.status(400).json({ error: 'Cannot authenticate user' });
    }
  }

  public async edit(req: OverRequest, res: Response): Promise<Response> {
    const user = req.body;
    console.log(user);
    const userId = req.body.userId;

    try {
      await User.findOneAndUpdate({ _id: userId }, user);
      const newUser = await User.findById(userId);

      return res.json(newUser);
    } catch (err) {
      return res.status(400).json({ error: 'Cannot edit user' });
    }
  }
}

interface OverRequest extends Request {
  body: User;
}

interface User extends IUser {
  userId: string;
}

export default new UserController();
