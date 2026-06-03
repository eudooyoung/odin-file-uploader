import dotenv from "dotenv";

dotenv.config();

const nodeEnv = process.env.NODE_ENV || "development";
dotenv.config({
  path: `.env.${nodeEnv}`,
  override: true,
});

const config = {
  port: Number(process.env.PORT),
  sessionSecret: process.env.SESSION_SECRET,
  databaseUrl: process.env.DATABASE_URL,
  debug: process.env.APP_DEBUG || "true",
};

export default config;
