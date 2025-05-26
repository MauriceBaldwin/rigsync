# React Static Web App

## Local development

Prerequisites:
- [Node.js v22](https://nodejs.org/en/download)

Create `.env` file with the following contents:
```
VITE_API_BASE_URL=http://localhost:7071/api
```

Install dependencies and run the app
```bash
npm install
npm run dev
```

## Deployment

[Set environment variables](https://learn.microsoft.com/en-us/azure/static-web-apps/application-settings#use-the-azure-portal) of the Static Web App.
Required environment variables:
- VITE_API_BASE_URL