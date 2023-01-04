# Project setup

Run

```bash
sudo sh setup.sh
```

Or do it manually

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

Or add this function to your .bashrc

```bash
pmigrate() {
    mkdir -p prisma/migrations/$1
    npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/$1/migration.sql
    npx prisma migrate resolve --applied $1
    npx prisma db push
    npx prisma generate
}
```

Run it with

```bash
source path/to/your/.bashrc
pmigrate VERSIONNUMBER
```

# TypeScript interfaces generator from Prisma schema

Package is purposely not forked.

Replace /node_modules/@kalissaac/prisma-typegen/lib/generateTypes.js createTypeFileContents function with the function below:

```
function createTypeFileContents(types, useType, generateInsertionTypes) {
    let fileContents = `// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// Use npx @kalissaac/prisma-typegen types prisma/schema.prisma to generate interfaces

export {}

declare global {${types.enums.map(prismaEnum => `  enum ${prismaEnum.name} {
${prismaEnum.values.map(value => `${value} = '${value}',`).join('\n')}
  }`).join('\n\n')}
${types.models.map(model => `  ${useType ? 'type' : 'interface'} ${model.name} ${useType ? '= ' : ''}{
${model.fields.map(field => createFieldLine(field, generateInsertionTypes)).join('\n')}
  }`).join('\n\n')}
}
`;
    return fileContents;
}
```

Then run this to generate interfaces:

```bash
npx @kalissaac/prisma-typegen types prisma/schema.prisma
```
