from .models import Product, Category, ContactMessage, ProductImage, BillingDetails, Order
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"
        
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image"]

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer (many=True, read_only=True)
    class Meta:
        model=Product
        fields="__all__"
        
class BillingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingDetails
        fields = "__all__"
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields="__all__"