import express, { Router } from "express";
import User from "../services/users/users.route";
import Task from "../services/tasks/tasks.route";



export const mountRoutePath = (app: { use: (routePath: string, router: Router) => void; }) => {
  const apiHandle = express.Router();
  apiHandle.use("/user", User);
  apiHandle.use("/task", Task)

  app.use("/api/task-manager", apiHandle);
}
