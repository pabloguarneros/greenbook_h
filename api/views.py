from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAdminUser, BasePermission
from . import serializers
from users.models import User, Plant

class UserDetail(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()

class PlantList(generics.ListCreateAPIView):

    serializer_class = serializers.PlantSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        plant_object = serializer.save()
        user.plants.add(plant_object)
        user.save()

    def get_queryset(self):
        return self.request.user.plants.all()

class PlantDetail(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = serializers.PlantSerializer
    permission_classes = [IsAuthenticated]

    queryset = Plant.objects.all()
