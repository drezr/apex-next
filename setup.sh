#!/bin/bash

npm i
touch .env
echo "DATABASE_URL=\"file:./dev.db\"" > .env
npx prisma migrate dev --name init

echo "Done !"
echo "Run 'npm run dev' to launch developpement server"