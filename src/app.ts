import express from "express";
import morgan from "morgan";
import winston from "winston";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import http from "http";
import cors from "cors";
import { mountRoutePath } from "./routes";


const createApp = async () => {
  const app: express.Application = express();

  const server = http.createServer(app);

  app.use(helmet());
  app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization", "x-auth-token", "x-access-token", "x-refresh-token"],
  }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "error-combined.log" }),
    ],
  });

  // create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream(path.join(__dirname, "error_access.log"), { flags: "a" });

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));

  mountRoutePath(app);

  return server;
}

export default createApp;

