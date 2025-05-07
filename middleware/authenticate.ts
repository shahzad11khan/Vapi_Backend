import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload;
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction) : void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ warning: 'Authorization token is required' });
    return;
  }
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
      res.status(401).json({ warning: 'Invalid token structure' });
      return;
    }

    req.user = decoded.userId;
    // req.user = decoded; 
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ err: 'Invalid or expired token' });
  }
};

export default authenticate;
