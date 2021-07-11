import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const getToken = async (
  login: string,
  password: string,
): Promise<string | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.find({ where: { login: login } });
  const result = user.filter(async (item) => {
    return await bcrypt.compare(password, item.password);
  });
  if (result.length == 0) return undefined;
  else {
    const token = jwt.sign(
      { id: result[0]?.id, login },
      String('JWT_SECRET_KEY'),
    );
    return token;
  }
};

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (['/doc', '/', '/login'].includes(req.path)) {
    return next();
  }
  const tokenStr = req.headers.authorization;
  if (tokenStr === undefined) {
    res.status(401);
  }
  const [type, token] = String(tokenStr).split(' ');
  if (type !== 'Bearer') {
    res.status(401);
  }
  const isVerified = jwt.verify(String(token), String('JWT_SECRET_KEY'));
  if (!isVerified) {
    res.status(401).json({ error: 'Unauthorized' });
  }

  return next();
};

export { getToken, checkToken };
