import { Request, response, Response } from 'express';
import Assistant from '../models/assistant.model';

export const updateAssistant = async (req: Request, res: Response) : Promise<void> => {
  try {
    const {FirstPrompt , SystemPrompt} =req.body;
    const {id} = req.params;

    const assistant = await Assistant.findByIdAndUpdate(id, {FirstPrompt , SystemPrompt}, { new: true });

    if (!assistant) {
       res.status(404).json({ error: 'Assistant not found' });
       return;
    }
    res.status(201).json({message:"Assistant updated Successfully"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create assistant' });
  }
};

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
  try{
    const assistants = await Assistant.find();
    res.status(200).json(assistants);
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Failed to create assistant', err });
  }
};
