from django.contrib.auth.models import User
from rest_framework import serializers


class AdminUserSerializer(serializers.ModelSerializer):
    order_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "is_active",
            "date_joined",
            "order_count",
        ]
        read_only_fields = [
            "id",
            "username",
            "date_joined",
            "order_count",
        ]

    def get_order_count(self, obj):
        return obj.orders.count()
