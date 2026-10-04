from rest_framework import serializers

from products.models import Category


class AdminCategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "is_active",
            "product_count",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "product_count",
            "created_at",
        ]

    def get_product_count(self, obj):
        return obj.products.count()
