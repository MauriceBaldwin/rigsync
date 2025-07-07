/// <reference types="vite/client" />

// typings for the vite environment variables.
// see .env file.
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string | undefined
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}