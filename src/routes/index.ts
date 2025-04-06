import express, { Router } from "express";



export const mountRoutePath = (app: { use: (routePath: string, router: Router) => void; }) => {
  const apiHandle = express.Router();
  // apiHandle.use("/user", User);
  // apiHandle.use("/verifications", Verification);
  // apiHandle.use("/auth", Authentication);

  app.use("/api/medication-manager", apiHandle);
}
