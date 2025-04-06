import express, { Router } from "express";
import User from "../services/users/users.route";



export const mountRoutePath = (app: { use: (routePath: string, router: Router) => void; }) => {
  const apiHandle = express.Router();
  apiHandle.use("/user", User);
  // apiHandle.use("/verifications", Verification);
  // apiHandle.use("/auth", Authentication);

  app.use("/api/task-manager", apiHandle);
}
