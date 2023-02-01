#!/bin/bash

npm i
touch .env
echo "DATABASE_URL=\"file:./dev.db\"" > .env

echo "Done !"
echo "Run 'npm run dev' to launch developpement server"