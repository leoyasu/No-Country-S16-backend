import "dotenv/config";

import env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  NODE_ENV: env.get("NODE_ENV").required().asString(),
  DB_URI: env.get("DB_URI").required().asString(),
  SECRET_JWD_SEED: env.get("SECRET_JWD_SEED").required().asString(),
  JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString(),
  CLOUDINARY_CLOUD_NAME: env.get("CLOUDINARY_CLOUD_NAME").required().asString(),
  CLOUDINARY_API_KEY: env.get("CLOUDINARY_API_KEY").required().asString(),
  CLOUDINARY_API_SECRET: env.get("CLOUDINARY_API_SECRET").required().asString(),
  GOOGLE_CLIENT_ID: env.get("GOOGLE_CLIENT_ID").required().asString(),
  GOOGLE_CLIENT_SECRET: env.get("GOOGLE_CLIENT_SECRET").required().asString(),
  SESSION_SECRET: env.get("SESSION_SECRET").required().asString(),
};
