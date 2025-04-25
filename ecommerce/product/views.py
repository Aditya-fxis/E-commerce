from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Product, Category, ContactMessage, BillingDetails, Order, ProductImage
from .serializers import ProductSerializer, CategorySerializer, ContactMessageSerializer, BillingDetailsSerializer, OrderSerializer

import stripe
import os
import logging
from dotenv import load_dotenv

load_dotenv()

# Setup logging
logger = logging.getLogger(__name__)

stripe.api_key = os.getenv("STRIPE_KEY_SECRET")


class ProductLCView(ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        try:
            queryset = Product.objects.all()
            category = self.request.query_params.get("category")
            min_price = self.request.query_params.get("min_price")
            max_price = self.request.query_params.get("max_price")

            if category:
                queryset = queryset.filter(category__name=category)
            if min_price:
                queryset = queryset.filter(price__gte=min_price)
            if max_price:
                queryset = queryset.filter(price__lte=max_price)

            return queryset
        except Exception as e:
            logger.error(f"Error in ProductLCView.get_queryset: {str(e)}")
            return Product.objects.none()

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                product = serializer.save()

                images = request.FILES.getlist("uploaded_images")
                for image in images:
                    ProductImage.objects.create(product=product, image=image)

                return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error in ProductLCView.post: {str(e)}")
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductRUDView(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            queryset = Product.objects.all()
            category = self.request.query_params.get('category')
            if category:
                queryset = queryset.filter(category__name=category)
            return queryset
        except Exception as e:
            logger.error(f"Error in ProductRUDView.get_queryset: {str(e)}")
            return Product.objects.none()


class CategoryLCView(ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CategorySerializer

    def get_queryset(self):
        try:
            return Category.objects.all()
        except Exception as e:
            logger.error(f"Error in CategoryLCView.get_queryset: {str(e)}")
            return Category.objects.none()


class CategoryRUDView(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class ContactMessageCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except Exception as e:
            logger.error(f"Error in ContactMessageCreateView.post: {str(e)}")
            return Response({"error": "Failed to send message"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BillingDetailsCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = BillingDetails.objects.all()
    serializer_class = BillingDetailsSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except Exception as e:
            logger.error(f"Error in BillingDetailsCreateView.post: {str(e)}")
            return Response({"error": "Failed to submit billing details"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_checkout_session(request):
    try:
        items = request.data.get("items", [])

        line_items = [
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": item["name"],
                    },
                    "unit_amount": int(item["price"] * 100),
                },
                "quantity": item["quantity"],
            } for item in items
        ]

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url="http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url="http://localhost:5173/checkout",
        )

        Order.objects.create(session_id=session.id, items=items, user=request.user)

        return Response({"id": session.id})
    except Exception as e:
        logger.error(f"Error in create_checkout_session: {str(e)}")
        return Response({"error": "Failed to create checkout session"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def verify_payment(request):
    session_id = request.GET.get("session_id")

    try:
        session = stripe.checkout.Session.retrieve(session_id)
        if session.payment_status == "paid":
            order = Order.objects.get(session_id=session_id)
            order.paid = True
            order.save()
            return Response({"success": True, "order": order.items})
        else:
            return Response({"success": False})
    except Exception as e:
        logger.error(f"Error in verify_payment: {str(e)}")
        return Response({"success": False, "error": str(e)})


class OrderLCView(ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
