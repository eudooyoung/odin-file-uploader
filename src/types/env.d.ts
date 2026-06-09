declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SESSION_SECRET: string;
      DATABASE_URL: string;
      CLOUD_NAME: string;
      CLOUD_API_KEY: string;
      CLOUD_API_SECRET: string;
      CLOUD_ROOT: string;
    }
  }
}

export {};
