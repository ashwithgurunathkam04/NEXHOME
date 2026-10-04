from rest_framework import serializers

from orders.models import Order


class AdminOrderItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(source="product.id")
    product_name = serializers.CharField(source="product.name")
    quantity = serializers.IntegerField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    subtotal = serializers.DecimalField(max_digits=12, decimal_places=2)


class AdminOrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    customer_email = serializers.CharField(source="user.email", read_only=True)
    items = AdminOrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "customer_name",
            "customer_email",
            "address",
            "total_amount",
            "delivery_charge",
            "status",
            "payment_status",
            "items",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "customer_name",
            "customer_email",
            "items",
            "created_at",
            "updated_at",
        ]

    def get_customer_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
