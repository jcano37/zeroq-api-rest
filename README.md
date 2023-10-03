<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://zeroq.cl/static/media/logo_white.7337d2ad.png" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">Prueba Tecnica.</p>

## Description
<p >Desarrolla una aplicación NestJS o nodejs typescript que permita a los usuarios registrarse y 
autenticarse utilizando JWT.Deberás implementar pruebas unitarias y pruebas e2e para garantizar 
la funcionalidad y documentar adecuadamente el código. Además, deberás dockerizar la aplicación 
y compartir el repositorio en GitHub. Se valorarán las buenas prácticas de desarrollo y la organización 
del código.
</p>

## Installation

```bash
$ npm install
```

## Running

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run in docker

```bash
# En el .env configurar 
$ DB_HOST=postgres-zeroq

# Deploy in docker
$  docker-compose up --build
```