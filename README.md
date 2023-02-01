# Project setup

On GNU/Linux, run

```bash
sh setup.sh
```

This will:

- Create a new database
- Create a .env file with the database path
- Install the Nuxt 3 project
- Create a migration file, push the schema to the database and generate the Prisma client

# Nuxt 3 Development Server

```bash
npm run dev
```

# Database migrations

Run this to setup the database on every schema changes

```bash
sh migrate.sh VERSIONNUMBER
```

This will

- Create a new migration file
- Push it to the database
- Generate a new Prisma client
- Generate TypeScript interfaces following the Prisma schema using [@kalissaac/prisma-typegen](https://github.com/Kalissaac/prisma-typegen)
