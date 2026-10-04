from rest_framework import serializers

from products.models import Product


class AdminProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "brand",
            "category",
            "category_name",
            "description",
            "price",
            "original_price",
            "stock",
            "rating",
            "review_count",
            "image_url",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]
