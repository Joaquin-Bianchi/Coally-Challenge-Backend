import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = new User({ email, password });
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '24h'
      });

      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '24h'
      });

      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();