import { Router } from "express";
import { body } from "express-validator";
import { authController } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
  ],
  validateRequest,
  authController.register.bind(authController)
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").exists(),
  ],
  validateRequest,
  authController.login.bind(authController)
);

export default router;