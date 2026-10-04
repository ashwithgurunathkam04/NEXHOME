from decimal import Decimal

from django.db import transaction
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from cart.models import Cart
from users.models import Address

from .models import Order, OrderItem
from .serializers import OrderSerializer


class CreateOrderView(generics.GenericAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):

        address_id = request.data.get("address_id")

        if not address_id:
            return Response(
                {"error": "address_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            address = Address.objects.get(
                id=address_id,
                user=request.user,
            )
        except Address.DoesNotExist:
            return Response(
                {"error": "Address not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            cart = (
                Cart.objects
                .prefetch_related("items__product")
                .get(user=request.user)
            )
        except Cart.DoesNotExist:
            return Response(
                {"error": "Cart not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        cart_items = list(
            cart.items.all(),
        )

        if not cart_items:
            return Response(
                {"error": "Your cart is empty."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        subtotal = Decimal("0.00")

        for cart_item in cart_items:
            product = cart_item.product

            if not product.is_active:
                return Response(
                    {
                        "error": (
                            f"{product.name} "
                            "is no longer available."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if cart_item.quantity > product.stock:
                return Response(
                    {
                        "error": (
                            f"Not enough stock "
                            f"for {product.name}."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            subtotal += (
                product.price *
                cart_item.quantity
            )

        if subtotal >= Decimal("10000.00"):
            delivery_charge = Decimal("0.00")
        else:
            delivery_charge = Decimal("99.00")

        total_amount = (
            subtotal +
            delivery_charge
        )

        order = Order.objects.create(
            user=request.user,
            address=address,
            total_amount=total_amount,
            delivery_charge=delivery_charge,
        )

        for cart_item in cart_items:
            product = cart_item.product

            item_subtotal = (
                product.price *
                cart_item.quantity
            )

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=cart_item.quantity,
                price=product.price,
                subtotal=item_subtotal,
            )

        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED,
        )


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Order.objects
            .filter(user=self.request.user)
            .select_related("address")
            .prefetch_related(
                "items__product__category",
            )
        )


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Order.objects
            .filter(user=self.request.user)
            .select_related("address")
            .prefetch_related(
                "items__product__category",
            )
        )


class CancelOrderView(generics.GenericAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, pk):
        try:
            order = (
                Order.objects
                .select_for_update()
                .prefetch_related(
                    "items__product",
                )
                .get(
                    id=pk,
                    user=request.user,
                )
            )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if order.status not in [
            "pending",
            "confirmed",
        ]:
            return Response(
                {
                    "error": (
                        "Order cannot be cancelled "
                        f"because its status is "
                        f"'{order.status}'."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        for order_item in order.items.all():
            product = order_item.product

            product.stock += (
                order_item.quantity
            )

            product.save(
                update_fields=[
                    "stock",
                    "updated_at",
                ],
            )

        order.status = "cancelled"

        order.save(
            update_fields=[
                "status",
                "updated_at",
            ],
        )

        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_200_OK,
        )