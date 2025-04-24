from django.urls import path
from product.views import ProductLCView, ProductRUDView, CategoryLCView, CategoryRUDView, ContactMessageCreateView, BillingDetailsCreateView, create_checkout_session, verify_payment, OrderLCView

urlpatterns = [
    path('shop/', ProductLCView.as_view(), name='product-list'),
    path('shop/<int:pk>/', ProductRUDView.as_view(), name='product-detail'),
    path('category/', CategoryLCView.as_view(), name='category-list'),
    path('category/<int:pk>', CategoryRUDView.as_view(), name='category-details'),
    path("contact/", ContactMessageCreateView.as_view(), name="contact"),
    path("billing/", BillingDetailsCreateView.as_view(), name="billing"),
    path("api/create_checkout_session/", create_checkout_session),
    path('api/verify-payment/', verify_payment, name='verify-payment'),
    path('order/', OrderLCView.as_view(), name='order-list'),
]
