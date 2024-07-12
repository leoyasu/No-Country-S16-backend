// app.js

import express from "express";
import cors from "cors";
import session from "express-session";
import { router } from "./routes/routes.js";
import { AppError, globalErrorHandler } from "./errors/indexError.js";
import passport from "./config/google/passport.js";
import { envs } from "./config/enviroments/enviroments.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: envs.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Rutas principales
app.use("/api/v1", router);

// Manejo de errores global
app.use(globalErrorHandler);

// Manejo de rutas no encontradas
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
