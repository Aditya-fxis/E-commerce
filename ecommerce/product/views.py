from django.shortcuts import render
from rest_framework.generics import  ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Product
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import ProductSerializer,CategorySerializer
# Create your views here.

class ProductLCView(ListCreateAPIView):
    queryset=Product.objects.all()
    serializer_class = ProductSerializer 

class ProductRUDView(RetrieveUpdateDestroyAPIView):
    queryset=Product.objects.filter()
    serializer_class = ProductSerializer
    permission_classes=[IsAuthenticated]
    
class CategoryLCView(ListCreateAPIView):
    queryset=Product.objects.all()
    serializer_class = CategorySerializer 

class CategoryRUDView(RetrieveUpdateDestroyAPIView):
    queryset=Product.objects.all()
    serializer_class = CategorySerializer
    permission_classes=[IsAuthenticated]