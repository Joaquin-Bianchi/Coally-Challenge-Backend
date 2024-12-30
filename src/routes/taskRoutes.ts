import { Router } from "express";
import { body, param, query } from "express-validator";
import { taskController } from "../controllers/taskController";
import { validateRequest } from "../middleware/validateRequest";
import { auth } from "../middleware/auth";

const router = Router();

router.use(auth);

router.post(
  "/",
  [
    body("title").notEmpty().trim().withMessage("Title is required"),
    body("description").optional().trim(),
  ],
  validateRequest,
  taskController.createTask.bind(taskController)
);

router.get(
  "/",
  [query("status").optional().isIn(["completed", "pending"])],
  validateRequest,
  taskController.getTasks.bind(taskController)
);

router.get(
  "/:id",
  [param("id").isMongoId()],
  validateRequest,
  taskController.getTask.bind(taskController)
);

router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("title").optional().trim(),
    body("description").optional().trim(),
    body("completed").optional().isBoolean(),
  ],
  validateRequest,
  taskController.updateTask.bind(taskController)
);

router.delete(
  "/:id",
  [param("id").isMongoId()],
  validateRequest,
  taskController.deleteTask.bind(taskController)
);

export default router;