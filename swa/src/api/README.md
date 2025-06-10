# Frontend API client

The API client is generated using [Orval](https://orval.dev/).

The contents of [swagger.json](./swagger.json) need to be kept up-to-date with the backend API by manually visiting [/api/swagger.json](http://localhost:7071/api/swagger.json) and downloading the response into this file.

You must then run
```bash
npx orval
```
to regenerate the API client.
