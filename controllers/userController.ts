import { Request, Response } from 'express';
import User from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
    const {
    firstName,
    lastName,
    phone,
    email,
    password,
    confirmPassword,
    companyName,
  } = req.body;
  if (!firstName || !lastName || !phone || !email || !password || !confirmPassword || !companyName) {
    res.json({ warning:"All fields is required" });
  }
  try {
    const newUser = await User.create(req.body);
    res.json({ message: 'User created successfully', user: newUser });  } catch (error) {
    res.json({ err: 'Failed to create user', error });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};
