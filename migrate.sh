#!/bin/bash

mkdir -p prisma/migrations/$1
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/$1/migration.sql
npx prisma migrate resolve --applied $1
npx prisma db push
npx prisma generate