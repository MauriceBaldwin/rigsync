/// <reference types="vite/client" />

// typings for the vite environment variables.
// see .env file.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string | undefined
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}