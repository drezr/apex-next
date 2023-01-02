// Use these commands to create postgresql database on UNIX systems
// sudo apt update
// sudo apt install postgresql postgresql-contrib
// sudo -u postgres psql
// CREATE DATABASE myproject;
// CREATE USER myprojectuser WITH PASSWORD 'password';
// ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
// ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
// ALTER ROLE myprojectuser SET timezone TO 'UTC';
// GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;
// \q
// Create .env file with DATABASE_URL=postgresql://myprojectuser:password@localhost:5432/myproject

// Use these commands on schema changes
// mkdir -p prisma/migrations/VERSIONNUMBER
// npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/VERSIONNUMBER/migration.sql
// npx prisma migrate resolve --applied VERSIONNUMBER
// npx prisma db push
// npx prisma generate

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
