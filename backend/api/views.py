from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
# from django.contrib.auth import authenticate # Not used in plain text mode
from .serializers import UserSerializer

"""
Hello World API
Simple GET endpoint to verify backend connectivity.
"""
@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from Django!"})

"""
Register User API
Handles User Creation (Sign Up).
Expects JSON: { "username": "...", "password": "...", "email": "..." }
"""
@api_view(['POST'])
def register_user(request):
    # Pass data to serializer for validation
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        # Triggers the create method in UserSerializer (now stores plain text)
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    
    # Return validation errors (e.g., username taken, missing fields)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
Login User API
Handles User Authentication.
Expects JSON: { "username": "...", "password": "..." }

NOTE: BASIC TEXTBOOK IMPLEMENTATION
Checks plain text password directly against database.
"""
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    try:
        # Manual lookup for user
        user = User.objects.get(username=username)
        
        # Check if plain text passwords match
        if user.password == password:
             return Response({"message": "Login successful", "username": user.username}, status=status.HTTP_200_OK)
        else:
             return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
             
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
