// Centralizes access to Vite env vars so the rest of the app never touches
// `import.meta.env` directly. Add new VITE_* vars here (and to .env.example)
// as the app needs them.

interface AppEnv {
  API_BASE_URL: string;
  WS_URL: string;
  APP_NAME: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
}

function readEnv(): AppEnv {
  const env = import.meta.env;
  return {
    API_BASE_URL: env.VITE_API_BASE_URL ?? "http://localhost:8000/api",
    WS_URL: env.VITE_WS_URL ?? "ws://localhost:8000/ws",
    APP_NAME: env.VITE_APP_NAME ?? "Ledgerline",
    MODE: env.MODE,
    DEV: env.DEV,
    PROD: env.PROD,
  };
}

export const ENV = readEnv();
