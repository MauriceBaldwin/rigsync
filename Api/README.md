# C# Functions API

## Local development

Prerequisites:
- [.NET 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)

Create a `local.settings.json` file, with the following contents:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=<name>;AccountKey=<key>",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated"
  },
  "Host": {
    "CORS": "http://localhost:5173"
  }
}
```
Make sure to enter your Azure Storage [connection string](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account) in the above.

Run the api
```bash
func start
```

## Deployment

[Set environment variables](https://learn.microsoft.com/en-gb/azure/azure-functions/functions-how-to-use-azure-function-app-settings#get-started-in-the-azure-portal) of the Functions App. Required environment variables:
- AzureWebJobsStorage (Not being used in this project at the moment, can ignore)

[Configure the Allowed Origins](https://learn.microsoft.com/en-gb/azure/azure-functions/functions-how-to-use-azure-function-app-settings#cors) of the Functions App to allow Cross-origin resource sharing (CORS) with the frontend.