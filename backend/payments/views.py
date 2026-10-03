import uuid

from django.db import transaction
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from cart.models import Cart
from orders.models import Order
from .models import Payment
from .serializers import PaymentSerializer


class SimulatePaymentView(generics.GenericAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        order_id = request.data.get("order_id")
        payment_method = request.data.get("payment_method")
        simulate_result = request.data.get("simulate_result", "success")

        # -------------------------
        # Validate input
        # -------------------------

        if not order_id:
            return Response(
                {"error": "order_id is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        if payment_method not in ["card", "upi", "cod"]:
            return Response(
                {"error": "Invalid payment method."}, status=status.HTTP_400_BAD_REQUEST
            )

        if simulate_result not in ["success", "failed"]:
            return Response(
                {"error": "simulate_result must be 'success' or 'failed'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------
        # Get user's order
        # -------------------------

        try:
            order = (
                Order.objects.select_for_update()
                .prefetch_related("items__product")
                .get(id=order_id, user=request.user)
            )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # -------------------------
        # Check existing payment
        # -------------------------

        if hasattr(order, "payment"):
            return Response(
                {"error": "Payment has already been processed for this order."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------------------------
        # Failed payment
        # -------------------------

        if simulate_result == "failed":
            transaction_id = f"SIM-{uuid.uuid4().hex[:12].upper()}"

            payment = Payment.objects.create(
                order=order,
                amount=order.total_amount,
                payment_method=payment_method,
                transaction_id=transaction_id,
                status="failed",
            )

            return Response(PaymentSerializer(payment).data, status=status.HTTP_200_OK)

        # -------------------------
        # Successful payment
        # -------------------------

        order_items = list(order.items.select_related("product"))

        if not order_items:
            return Response(
                {"error": "Order has no items."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Check stock using OrderItems
        for order_item in order_items:
            product = order_item.product

            if not product.is_active:
                return Response(
                    {"error": f"{product.name} is no longer available."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if order_item.quantity > product.stock:
                return Response(
                    {"error": f"Insufficient stock for {product.name}."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Create successful payment
        transaction_id = f"SIM-{uuid.uuid4().hex[:12].upper()}"

        payment = Payment.objects.create(
            order=order,
            amount=order.total_amount,
            payment_method=payment_method,
            transaction_id=transaction_id,
            status="success",
        )

        # Reduce stock
        for order_item in order_items:
            product = order_item.product

            product.stock -= order_item.quantity

            product.save(update_fields=["stock", "updated_at"])

        # Update order
        order.payment_status = "paid"
        order.status = "confirmed"

        order.save(update_fields=["payment_status", "status", "updated_at"])

        # Clear cart after successful payment
        cart = Cart.objects.filter(user=request.user).first()

        if cart:
            cart.items.all().delete()

        return Response(PaymentSerializer(payment).data, status=status.HTTP_200_OK)
