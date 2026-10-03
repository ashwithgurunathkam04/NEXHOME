from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "order",
        "amount",
        "payment_method",
        "transaction_id",
        "status",
        "created_at",
    ]

    list_filter = [
        "status",
        "payment_method",
        "created_at",
    ]

    search_fields = [
        "transaction_id",
        "order__id",
        "order__user__username",
        "order__user__email",
    ]

    ordering = ["-created_at"]
