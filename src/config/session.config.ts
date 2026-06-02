import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "../lib/prisma.js";
import session from "express-session";
import config from "./env.config.js";

const store = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: (sessionId) => sessionId,
});

export default session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});
