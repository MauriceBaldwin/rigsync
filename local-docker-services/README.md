# Local Docker Services

Docker can be used to run the database for local development.

## Running the services locally
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Run `docker compose up`

## Connecting to the local database
A connection string can be used to connect to the database. The connection string for this database is as follows:

`Server=localhost,1433;Database=master;User=sa;Password=Admin@123;TrustServerCertificate=True`

Note that you will need to replace `{port}` and `{password}` with the values used in [docker-compose.yml](./docker-compose.yml)