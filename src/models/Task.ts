import { Schema, model } from 'mongoose';
import { ITask } from '../types/task';

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Task = model<ITask>('Task', taskSchema);