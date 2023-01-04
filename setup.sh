#!/bin/bash

read -p "Database name: " db_name
read -p "Database username: " username
read -s -p "Database password: " password
printf "\n"

sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start

DB_CONNECTION="postgresql://$username:$password@localhost/postgres"

sudo -u postgres psql -c "CREATE USER $username WITH PASSWORD '$password';"
sudo -u postgres psql -c "ALTER ROLE $username WITH CREATEDB;"
sudo -u postgres psql -c "ALTER ROLE $username SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE $username SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE $username SET timezone TO 'UTC';"
sudo -u postgres psql $DB_CONNECTION -c "CREATE DATABASE $db_name;"
sudo -u postgres psql $DB_CONNECTION -c "GRANT ALL PRIVILEGES ON DATABASE $db_name TO $username;"

touch .env
echo "DATABASE_URL=postgresql://$username:$password@localhost:5432/$db_name" > .env

npm install

mkdir -p prisma/migrations/initial_0
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/initial_0/migration.sql
npx prisma migrate resolve --applied initial_0
npx prisma db push
npx prisma generate

echo "Done !"
echo "Run 'npm run dev' to launch developpement server"