from django.contrib import admin

from .models import Order, OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "user",
        "total_amount",
        "status",
        "payment_status",
        "created_at",
    ]

    list_filter = [
        "status",
        "payment_status",
        "created_at",
    ]

    search_fields = [
        "user__username",
        "user__email",
    ]

    ordering = ["-created_at"]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "order",
        "product",
        "quantity",
        "price",
        "subtotal",
    ]

    search_fields = [
        "order__id",
        "product__name",
    ]
