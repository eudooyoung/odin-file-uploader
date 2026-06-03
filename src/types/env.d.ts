declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SESSION_SECRET: string;
      DATABASE_URL: string;
    }
  }
}

export {};
