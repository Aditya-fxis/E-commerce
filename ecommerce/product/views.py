from django.shortcuts import render
from rest_framework.generics import  CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Product, Category, ContactMessage
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .serializers import ProductSerializer,CategorySerializer, ContactMessageSerializer
# Create your views here.

class ProductLCView(ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get("category", None)
        min_price = self.request.query_params.get("min_price", None)
        max_price = self.request.query_params.get("max_price", None)

        if category:
            queryset = queryset.filter(category__name=category)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset


class ProductRUDView(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category__name=category)
        return queryset
    
class CategoryLCView(ListCreateAPIView):
    queryset=Category.objects.all()
    serializer_class = CategorySerializer 

class CategoryRUDView(RetrieveUpdateDestroyAPIView):
    queryset=Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes=[IsAuthenticated]
    
class ContactMessageCreateView(CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         contact_message = serializer.save()

    #         # Send email notification to admin
    #         message = (
    #             f"Name: {contact_message.name}\n"
    #             f"Email: {contact_message.email}\n\n"
    #             f"Message:\n{contact_message.message}"
    #         )

    #         send_mail(
    #             message=message,
    #             from_email=settings.DEFAULT_FROM_EMAIL,
    #             recipient_list=[settings.ADMIN_EMAIL],
    #             fail_silently=False,
    #         )

    #         return Response({"message": "Your message has been sent!"}, status=status.HTTP_201_CREATED)
        
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)