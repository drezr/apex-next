# Project setup

Run

```bash
sudo sh setup.sh db_name db_username db_password
```

This will:

- Install PostgreSQL
- Start the service
- Create a new database
- Create a .env file with the database connexion informations
- Install the Nuxt 3 project
- Create a migration file, push the schema to the database and generate the Prisma client

Or do it manually:

# PostgreSQL setup

## Use these commands to create PostgreSQL database on UNIX systems

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql
```

Then run

```bash
CREATE DATABASE myproject;
CREATE USER myprojectuser WITH PASSWORD 'password';
ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myprojectuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;
\q
```

## Create .env file at the root of the project with the following content

```
DATABASE_URL=postgresql://myprojectuser:password@localhost:5432/myproject
```

# Nuxt 3 setup

## Install the dependencies:

```bash
npm install
```

## Development Server

```bash
npm run dev
```

# Migrations

Use these commands to setup the database and on every schema changes

```bash
mkdir -p prisma/migrations/VERSIONNUMBER
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/VERSIONNUMBER/migration.sql
npx prisma migrate resolve --applied VERSIONNUMBER
npx prisma db push
npx prisma generate
```

Or run the migration script

```bash
sh migrate.sh VERSIONNUMBER
```

# TypeScript interfaces generator from Prisma schema

Run this to generate interfaces:

```bash
sh geninterfaces.sh
```
