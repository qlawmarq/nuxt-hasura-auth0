# nuxt-js-hasura-postgres

> Nuxt.js with GraphQL Server by Hasura.

## Build Nuxt.js App Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Build GraphQL Server by Hasura

```
$ docker-compose up -d
```

More info [here](https://hasura.io/docs/1.0/graphql/manual/getting-started/docker-simple.html).

### Create Table

Access URL below.

http://localhost:8080/console

Access then, Create Table below.

```
users
id - integer, auto increment, primary key
name - text
```
