from django.db import models
from rest_framework import generics, status
from rest_framework.response import Response

from .models import Category, Product
from .pagination import ProductPagination
from .serializers import CategorySerializer, ProductSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True).select_related("category")

        # -------------------------
        # Search
        # -------------------------
        search = self.request.query_params.get("search")

        if search:
            search = search.strip()

            queryset = queryset.filter(
                models.Q(name__icontains=search)
                | models.Q(brand__icontains=search)
                | models.Q(description__icontains=search)
            )

        # -------------------------
        # Category
        # -------------------------
        category = self.request.query_params.get("category")

        if category:
            category = category.strip()
            queryset = queryset.filter(category__slug=category)

        # -------------------------
        # Price filters
        # -------------------------
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")

        if min_price:
            try:
                min_price = float(min_price)

                if min_price < 0:
                    raise ValueError
            except ValueError:
                return Response(
                    {"error": "min_price must be a valid non-negative number."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            try:
                max_price = float(max_price)

                if max_price < 0:
                    raise ValueError
            except ValueError:
                return Response(
                    {"error": "max_price must be a valid non-negative number."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            queryset = queryset.filter(price__lte=max_price)

        # -------------------------
        # Rating filter
        # -------------------------
        min_rating = self.request.query_params.get("min_rating")

        if min_rating:
            try:
                min_rating = float(min_rating)

                if min_rating < 0 or min_rating > 5:
                    raise ValueError
            except ValueError:
                return Response(
                    {"error": "min_rating must be between 0 and 5."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            queryset = queryset.filter(rating__gte=min_rating)

        # -------------------------
        # Sorting
        # -------------------------
        sort = self.request.query_params.get("sort")

        if sort == "price_low":
            queryset = queryset.order_by("price")

        elif sort == "price_high":
            queryset = queryset.order_by("-price")

        elif sort == "rating":
            queryset = queryset.order_by("-rating")

        elif sort == "newest":
            queryset = queryset.order_by("-created_at")

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True).select_related("category")

    serializer_class = ProductSerializer
