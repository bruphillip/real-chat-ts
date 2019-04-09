import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export class Authentication {
  async authentication(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const authHeaders = req.headers.authorization;

    if (!authHeaders)
      return res.status(401).json({ error: 'No Token Provided' });

    const parts = authHeaders.split(' ');

    if (parts.length !== 2)
      return res.status(401).json({ error: 'Token error' });

    const [scheme, token] = parts;

    if (scheme !== 'Bearer')
      return res.status(401).json({ error: 'Token malformated' });

    try {
      const decoded = <{ id: string; iat: number; exp: number }>(
        await verify(token, <string>process.env.SECRET)
      );
      req.body.userId = decoded.id;
      return next();
    } catch (err) {
      return res.json(401).json({ error: 'Invalid token' });
    }
  }
}
