#!/bin/bash

# Start Backend and Frontend concurrently

echo "Starting Backend Server..."
cd backend && npm run dev &
BACKEND_PID=$!

echo "Starting Frontend Server..."
cd frontend && npm run dev &
FRONTEND_PID=$!

# Trap CTRL+C to kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Wait for both processes
wait
