import { Request, Response } from 'express';
import Assistant from '../models/assistant.model';

export const createAssistant = async (req: Request, res: Response) => {
  try {
    const assistant = await Assistant.create(req.body);
    res.status(201).json(assistant);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create assistant', error });
  }
};

export const getAssistants = async (_req: Request, res: Response) => {
  const assistants = await Assistant.find();
  res.json(assistants);
};
