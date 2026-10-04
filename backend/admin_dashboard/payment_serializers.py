from rest_framework import serializers

from payments.models import Payment


class AdminPaymentSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(source="order.id", read_only=True)
    customer_name = serializers.SerializerMethodField()
    customer_email = serializers.CharField(
        source="order.user.email",
        read_only=True,
    )

    class Meta:
        model = Payment
        fields = [
            "id",
            "order_id",
            "customer_name",
            "customer_email",
            "amount",
            "payment_method",
            "transaction_id",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "order_id",
            "customer_name",
            "customer_email",
            "transaction_id",
            "created_at",
            "updated_at",
        ]

    def get_customer_name(self, obj):
        user = obj.order.user
        return user.get_full_name() or user.username
