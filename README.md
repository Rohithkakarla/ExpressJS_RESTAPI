# Introduction

This is small Project created using NodeJS and Express and some other npm packages.A RestAPI application that connects to mongodb. The whole environment is created using docker compose.

# Setup

- NodeJS
- NPM
- Docker


# MongoDB compose data

```sh
image: mongo
restart: unless-stopped
env_file: .env
environment:
    - MONGO_INITDB_ROOT_USERNAME=$MONGO_USERNAME
    - MONGO_INITDB_ROOT_PASSWORD=$MONGO_PASSWORD
    - MONGO_INITDB_DATABASE=$MONGO_DB
volumes:
    - ./mongo_backup:/data/db
```

