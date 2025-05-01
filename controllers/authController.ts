import { Request, Response } from 'express';
import User ,{IUser} from '../models/user.model';
import jwt from 'jsonwebtoken';

// Login handler
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ warning: 'Email and password are required' });
    }
    const user = await User.findOne({ email })  as IUser;
    if (!user) {
      return res.status(400).json({ warning: 'Invalid email or password' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ warning: 'Invalid  password' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1y',
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: 'Server error' });
  }
};
