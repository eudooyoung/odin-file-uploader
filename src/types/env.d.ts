declare global {
  namespace NodeJs {
    interface ProcessEnv {
      PORT: string;
      SESSION_SECRET: string;
      DATABASE_URL: string;
    }
  }
}
