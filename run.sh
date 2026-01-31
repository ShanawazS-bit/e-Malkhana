#!/bin/bash

cleanup() {
    echo -e "\n Stopping servers..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit
}

trap cleanup SIGINT

echo " Starting Django Backend..."
source venv/bin/activate
cd backend
python manage.py runserver &
BACKEND_PID=$!
cd ..

echo "🚀 Starting React Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo " Both servers are running. Press Ctrl+C to stop."
wait
