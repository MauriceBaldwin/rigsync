# Local Docker Services

Docker can be used to run the database for local development.

## Running the services locally
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Run `docker compose up`

## Connecting to the local database
1. Using a db query tool of your choice, connect to the db using the following configuration:
  - hostname: localhost,1433 (confirm port in docker-compose file)
  - username: sa
  - password: (see docker-compose file)
