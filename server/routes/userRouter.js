import { Router } from "express";

export const userRouter = new Router();

userRouter.post("/registrations");
userRouter.post("login");
userRouter.post("/logout");
userRouter.get("/activate/:link");
userRouter.get("/refresh");
userRouter.get("/users");
