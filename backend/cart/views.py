from django.db import IntegrityError
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from products.models import Product

from .models import Cart, CartItem
from .serializers import CartSerializer


class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)

        return cart


class AddToCartView(generics.GenericAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 1)

        if not product_id:
            return Response(
                {"error": "product_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            quantity = int(quantity)
        except (TypeError, ValueError):
            return Response(
                {"error": "quantity must be a number."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if quantity <= 0:
            return Response(
                {"error": "quantity must be greater than 0."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            product = Product.objects.get(
                id=product_id,
                is_active=True,
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if product.stock < quantity:
            return Response(
                {"error": "Not enough stock available."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cart, created = Cart.objects.get_or_create(user=request.user)

        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={
                "quantity": quantity,
            },
        )

        if not item_created:
            new_quantity = cart_item.quantity + quantity

            if new_quantity > product.stock:
                return Response(
                    {"error": "Not enough stock available."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            cart_item.quantity = new_quantity
            cart_item.save()

        return Response(
            CartSerializer(cart).data,
            status=status.HTTP_200_OK,
        )
