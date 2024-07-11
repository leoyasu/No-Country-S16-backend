import express from "express";
import cors from "cors";
import { router } from "./routes/routes.js";
import { AppError, globalErrorHandler } from "./errors/indexError.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
