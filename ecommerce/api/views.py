from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
# from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import CustomUser
from api.serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    """ Function to generate JWT access and refresh tokens for a user """
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }

#  User Registration View
class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({
                "message": "User registered successfully.",
                "token": token
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#  User Login View
class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            update_last_login(None, user)
            tokens = get_tokens_for_user(user)
            return Response({
                "message": "Login successful.",
                "tokens": tokens,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#  User Profile View (Requires Authentication)
class UserProfileView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
