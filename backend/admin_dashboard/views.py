from django.contrib.auth.models import User
from django.db.models import Sum
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .payment_serializers import AdminPaymentSerializer

from .order_serializers import AdminOrderSerializer

from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    ListAPIView,
    RetrieveAPIView,
)

from .serializers import AdminProductSerializer
from .category_serializers import AdminCategorySerializer

from orders.models import Order
from payments.models import Payment
from products.models import Category, Product

from .permissions import IsAdminUser

from .user_serializers import AdminUserSerializer


class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        total_products = Product.objects.filter(is_active=True).count()

        total_categories = Category.objects.filter(is_active=True).count()

        total_users = User.objects.count()

        total_orders = Order.objects.count()

        pending_orders = Order.objects.filter(status="pending").count()

        confirmed_orders = Order.objects.filter(status="confirmed").count()

        shipped_orders = Order.objects.filter(status="shipped").count()

        delivered_orders = Order.objects.filter(status="delivered").count()

        cancelled_orders = Order.objects.filter(status="cancelled").count()

        total_revenue = (
            Payment.objects.filter(status="success").aggregate(total=Sum("amount"))[
                "total"
            ]
            or 0
        )

        successful_payments = Payment.objects.filter(status="success").count()

        failed_payments = Payment.objects.filter(status="failed").count()

        return Response(
            {
                "total_products": total_products,
                "total_categories": total_categories,
                "total_users": total_users,
                "total_orders": total_orders,
                "pending_orders": pending_orders,
                "confirmed_orders": confirmed_orders,
                "shipped_orders": shipped_orders,
                "delivered_orders": delivered_orders,
                "cancelled_orders": cancelled_orders,
                "total_revenue": total_revenue,
                "successful_payments": successful_payments,
                "failed_payments": failed_payments,
            }
        )


class AdminProductListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminProductSerializer

    def get_queryset(self):
        return Product.objects.select_related("category").all()


class AdminProductDetailView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminProductSerializer

    def get_queryset(self):
        return Product.objects.select_related("category").all()


class AdminCategoryListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminCategorySerializer

    def get_queryset(self):
        return Category.objects.all().order_by("name")


class AdminCategoryDetailView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminCategorySerializer

    def get_queryset(self):
        return Category.objects.all()


class AdminOrderListView(ListAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminOrderSerializer

    def get_queryset(self):
        return (
            Order.objects.select_related("user", "address")
            .prefetch_related("items__product")
            .order_by("-created_at")
        )


class AdminOrderDetailView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminOrderSerializer

    def get_queryset(self):
        return Order.objects.select_related("user", "address").prefetch_related(
            "items__product"
        )


class AdminUserListView(ListAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminUserSerializer

    def get_queryset(self):
        return User.objects.all().order_by("-date_joined")


class AdminUserDetailView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminUserSerializer

    def get_queryset(self):
        return User.objects.all()


class AdminPaymentListView(ListAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminPaymentSerializer

    def get_queryset(self):
        return Payment.objects.select_related("order__user").order_by("-created_at")


class AdminPaymentDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminPaymentSerializer

    def get_queryset(self):
        return Payment.objects.select_related("order__user")
