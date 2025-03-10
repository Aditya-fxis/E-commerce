from django.urls import path
from product.views import ProductLCView, ProductRUDView,CategoryLCView

urlpatterns = [
    path('shop/', ProductLCView.as_view(), name='shop-list'),
    path('shop/<int:pk>/', ProductRUDView.as_view(), name='shop-detail'),
    path('category/', CategoryLCView.as_view(), name='category'),
]
