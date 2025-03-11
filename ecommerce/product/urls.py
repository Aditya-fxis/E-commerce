from django.urls import path
from product.views import ProductLCView, ProductRUDView, CategoryLCView, CategoryRUDView, ContactMessageCreateView

urlpatterns = [
    path('shop/', ProductLCView.as_view(), name='product-list'),
    path('shop/<int:pk>/', ProductRUDView.as_view(), name='product-detail'),
    path('category/', CategoryLCView.as_view(), name='category-list'),
    path('category/<int:pk>', CategoryRUDView.as_view(), name='category-details'),
     path("contact/", ContactMessageCreateView.as_view(), name="contact"),
]
