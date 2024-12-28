import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";
import { ICreateTask, IUpdateTask } from "../types/task";

export class TaskController {
  async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskData: ICreateTask = req.body;
      const task = await taskService.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const status = req.query.status as string;
      const completed = status ? status === "completed" : undefined;
      const tasks = await taskService.getAllTasks(completed);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const task = await taskService.getTaskById(req.params.id);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskData: IUpdateTask = req.body;
      const task = await taskService.updateTask(req.params.id, taskData);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const task = await taskService.deleteTask(req.params.id);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const taskController = new TaskController();
