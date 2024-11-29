#!/bin/bash


echo "export DATABASE_URL=${DATABASE_URL}" >> ~/.bashrc
echo "export POSTGRES_DB=${POSTGRES_DB}" >> ~/.bashrc

echo "Enviromental variables added successfully"

cd cd ~/app_directory/user-dashboard
cd server
echo "starting backend"
npm run start:dev
echo "backend started successfully"
cd cd ~/app_directory/user-dashboard
cd client
echo "starting frontend"
npm run dev
echo "frontend started successfully"
