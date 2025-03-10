from django.contrib import admin
from .models import Product,Category
# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    admin.site.register(Product)
class CategoryAdmin(admin.ModelAdmin):
    admin.site.register(Category)