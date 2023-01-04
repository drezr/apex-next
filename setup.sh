#!/bin/bash

sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start

DB_CONNECTION="postgresql://$2:$3@localhost/postgres"

sudo -u postgres psql -c "CREATE USER $2 WITH PASSWORD '$3';"
sudo -u postgres psql -c "ALTER ROLE $2 WITH CREATEDB;"
sudo -u postgres psql -c "ALTER ROLE $2 SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE $2 SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE $2 SET timezone TO 'UTC';"
sudo -u postgres psql $DB_CONNECTION -c "CREATE DATABASE $1;"
sudo -u postgres psql $DB_CONNECTION -c "GRANT ALL PRIVILEGES ON DATABASE $1 TO $2;"

touch .env
echo "DATABASE_URL=postgresql://$2:$3@localhost:5432/$1" > .env

npm install

mkdir -p prisma/migrations/initial_0
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/initial_0/migration.sql
npx prisma migrate resolve --applied initial_0
npx prisma db push
npx prisma generate

echo "Done !"
echo "Run 'npm run dev' to launch developpement server"
