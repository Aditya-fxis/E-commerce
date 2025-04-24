from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal

# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=50)
      
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    description = models.TextField(blank=True, null=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1, validators=[MinValueValidator(Decimal("1.0")), MaxValueValidator(Decimal("5.0"))], blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    sale = models.BooleanField(default=False)
    main_image = models.ImageField(upload_to="products/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"
 
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/")

    def __str__(self):
        return f"Image for Product ID {self.product.id}"
    

class BillingDetails(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=255)
    zip = models.CharField(max_length=255)
    apartment = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"

class Order(models.Model):
    session_id = models.CharField(max_length=255, unique=True)
    items = models.JSONField()  # or use related models if you prefer
    created_at = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)

    def __str__(self):
        return f"Order {self.id} - Paid: {self.paid}"