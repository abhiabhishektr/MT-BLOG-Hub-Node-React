import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_EXPIRY, JWT_SECRET } from '../config/jwt';
import sendResponse from '../utils/response';

// Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;
  console.log("firstName, lastName, email, password: ", firstName, lastName, email, password);

  // Check for required fields
  if (!firstName || !lastName || !email || !password) {
    sendResponse(res, 400, 'All fields are required');
    return;
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      sendResponse(res, 409, 'Email is already in use');
      return;
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    sendResponse(res, 201, 'User created successfully', { token , user: savedUser.firstName });
  } catch (error) {
    console.log("error: ", error);
    sendResponse(res, 400, 'Error creating user');
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({ email: identifier });

    if (!user || !(await user.comparePassword(password))) {
      sendResponse(res, 401, 'Invalid credentials');
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    sendResponse(res, 200, 'Login successful', { token, user: user.firstName });
  } catch (error) {
    sendResponse(res, 500, 'Internal server error');
  }
};
