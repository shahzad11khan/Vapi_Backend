import { Request, Response } from 'express';
import Log from '../models/log.model';

export const createLog = async (req: Request, res: Response) => {
  try {
    const log = await Log.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create log', error });
  }
};

export const getLogs = async (_req: Request, res: Response) => {
  const logs = await Log.find().populate('user');
  res.json(logs);
};
