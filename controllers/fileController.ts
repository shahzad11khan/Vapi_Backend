import { Request, Response } from 'express';
import fs from 'fs';
import File from "../models/file.model";
import path from "path";
import pdfParse from 'pdf-parse';



interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const createFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const multerReq = req as MulterRequest;
    if (!multerReq.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const id = req.user;
    const { mimetype, filename, path: filePath } = multerReq.file;

    if (mimetype !== 'application/pdf') {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
          res.status(500).json({ error: 'Invalid file type and deletion failed' });
        } else {
          res.status(400).json({ warning: 'Only PDF File are allowed. File deleted.' });
        }
      });
      return; 
    }
    const file = new File({
        pdfFile: {
          fileName:filename,
          path: filePath,
        },
        createdBy: id,
      });
  
      await file.save();

    res.status(201).json({ message: 'File received successfully', filename });
  } catch (err) {
    console.error('Error in createFile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getFile = async (_req: Request, res: Response) => {
  try{
    const files = await File.find();
    res.status(200).json({files , message : "data fetch successfully"});
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Failed to create assistant', err });
  }
};


export const readFile = async (req: Request, res: Response) => {
  try{
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    const pdfText = data.text.replace(/\n/g, " ");
    res.send({
      text: pdfText,
      message: 'data parse succcessfully'
    });
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Failed to create assistant', err });
  }
};