import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../Models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../MiddleWare/auth';

const router = express.Router();

// Login Route
router.post(
  '/login',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1d',
      });

      // Set token in HTTP-only cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000, // 1 day
      });

      // Respond with user ID
      res.status(200).json({ userId: user.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Validate Token Route
router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  res.status(200).json({ userId: req.userId });
});

// Logout Route
router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // Immediately expire the cookie
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
