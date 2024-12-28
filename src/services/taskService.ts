import { Task } from "../models/Task";
import { ICreateTask, ITask, IUpdateTask } from "../types/task";

export class TaskService {
  async createTask(taskData: ICreateTask): Promise<ITask> {
    const task = new Task(taskData);
    return await task.save();
  }

  async getAllTasks(completed?: boolean): Promise<ITask[]> {
    const filter = completed !== undefined ? { completed } : {};
    return await Task.find(filter);
  }

  async getTaskById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  async updateTask(id: string, taskData: IUpdateTask): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, taskData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTask(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }
}

export const taskService = new TaskService();
