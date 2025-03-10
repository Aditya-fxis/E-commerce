from .models import Product, Category
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model=Product
        fields="__all__"
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"
    