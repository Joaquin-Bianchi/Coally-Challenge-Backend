import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    res.status(400).json({
      error: 'Validation Error',
      details: Object.values((err as Error.ValidationError).errors).map(error => error.message)
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      error: 'Invalid ID format'
    });
    return;
  }

  res.status(500).json({
    error: 'Internal Server Error'
  });
};