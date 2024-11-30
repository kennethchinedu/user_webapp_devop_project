#!/bin/bash

# Ensure the app directory exists and clone the repo if not already cloned
if [ ! -d "~/app_directory/user-webapp-devop-project" ]; then
    echo "Repository not found. Cloning..."
    git clone https://github.com/kennethchinedu/user_webapp_devop_project ~/app_directory/user-webapp-devop-project
else
    echo "Repository already cloned"
fi

# Export environment variables
echo "export DATABASE_URL=${DATABASE_URL}" >> ~/.env
echo "export POSTGRES_DB=${POSTGRES_DB}" >> ~/.env
cp ~/.env ~/app_directory/user-webapp-devop-project/server/.env




echo "Environmental variables added successfully"

# Ensure Node.js and npm are installed
if ! command -v npm &> /dev/null; then
    echo "npm not found, installing Node.js and npm..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Navigate to the backend directory and start the server
cd ~/app_directory/user-webapp-devop-project/server || { echo "Backend directory not found"; exit 1; }
echo "Starting backend"
npm install
npm run start:dev &
echo "Backend started successfully"

# Navigate to the frontend directory and start the client
cd ~/app_directory/user-webapp-devop-project/client || { echo "Frontend directory not found"; exit 1; }
echo "Starting frontend"
npm install
npm run dev &
echo "Frontend started successfully"


echo "app is running successfully"