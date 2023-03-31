import { Router } from "express";
import { userRouter } from "./userRouter.js";

export const router = new Router();
router.use("/user", userRouter);
