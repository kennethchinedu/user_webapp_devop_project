#!/bin/bash

# Export environment variables
echo "export DATABASE_URL=${DATABASE_URL}" >> ~/.bashrc
echo "export POSTGRES_DB=${POSTGRES_DB}" >> ~/.bashrc

# Source .bashrc to apply changes immediately
source ~/.bashrc

echo "Environmental variables added successfully"

# Ensure Node.js and npm are installed
if ! command -v npm &> /dev/null; then
    echo "npm not found, installing Node.js and npm..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Navigate to the backend directory and start the server
cd ~/app_directory/user-dashboard/server || { echo "Backend directory not found"; exit 1; }
echo "Starting backend"
npm install
npm run start:dev &
echo "Backend started successfully"

# Navigate to the frontend directory and start the client
cd ~/app_directory/user-dashboard/client || { echo "Frontend directory not found"; exit 1; }
echo "Starting frontend"
npm install
npm run dev &
echo "Frontend started successfully"
