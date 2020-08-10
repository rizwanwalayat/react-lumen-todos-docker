# React-Lumen-Todos-Docker

A complete Todos React Application with a Laravel/Lumen API. User Login/Registration secured with OAuth2.0 authentication and containerized with Docker.

## Setting Up

1. Clone the Repo from Github
```bash
$ git clone https://github.com/rizwanwalayat/react-lumen-todos-docker.git
```

2. Open the project files and navigate to laradock/ folder from your bash terminal:
```bash
$ cd laradock/
```

3. Docker Compose will build and run all the Docker containers to run our application: 
(nginx, php, mysql, react, etc):
```bash
$ docker-compose up -d mysql nginx react
```

4. Make sure the workspace container is running, this is needed to run **artisan** commands:
```bash
$ docker-compose up -d workspace
```

5. Enter the workspace container:
```bash
$ docker-compose exec workspace bash
```

6. Inside the workspace container, run the migrations:
```bash
php artisan migrate
```

7. Install Laravel/Lumen Passport Encryption Keys:
```bash
php artisan passport:install
```
8. Connect to our mysql database running inside the container from any SQL Client using the following credentials:
```bash 
MYSQL_DATABASE=127.0.0.1
MYSQL_PORT=4306
MYSQL_USER=default
MYSQL_PASSWORD=secret
```
9. Copy the value of "secret" of "Lumen Password Grant Client" column from "oauth_clients" table of our mysql database to "client/Login.js" file and place it into the "client_secret" object.


> Our application should be up and running :) Navigate to <http://localhost:3030> 

------