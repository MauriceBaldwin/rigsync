# C# Functions API

## Local development

### Prerequisites
- [.NET 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)

### Required services
Note: Recommend use of [local-docker-services](../local-docker-services/README.md) to run these locally.
- SQL Server + Database

### Configuration
Create a `local.settings.json` file, with the following contents:
```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated"
  },
  "Host": {
    "CORS": "http://localhost:5173"
  }
}
```

### Run the api
```bash
func start
```

## Deployment

[Configure the Allowed Origins](https://learn.microsoft.com/en-gb/azure/azure-functions/functions-how-to-use-azure-function-app-settings#cors) of the Functions App to allow Cross-origin resource sharing (CORS) with the frontend.