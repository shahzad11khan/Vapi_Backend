import { Request, response, Response } from 'express';
import Assistant from '../models/assistant.model';

export const createAssistant = async (req: Request, res: Response) => {
  try {
    console.log(req.body , req.user )
    const assistant = await Assistant.create({...req.body , createdBy : req.user});
    res.status(201).json({message:"Assistant Added Successfully" , assistant });
  } catch (error) {
    res.status(500).json({ err: 'Failed to create assistant', error });
  }
};

export const getAssistants = async (_req: Request, res: Response) => {
  const assistants = await Assistant.find();
  res.json(assistants);
};
