import { defineConfig } from 'orval';

export default defineConfig({
  'rigsync-api': {
    input: {
      target: './src/api/swagger.json',
    },
    output: {
      mode: 'tags',
      workspace: './src/api',
      target: 'generated/endpoints',
      schemas: 'generated/models',
      clean: true,
      override: {
        mutator: {
          path: 'axiosInstance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});