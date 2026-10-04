from django.urls import path

from .views import (
    AdminDashboardView,
    AdminProductDetailView,
    AdminProductListView,
    AdminCategoryListView,
    AdminCategoryDetailView,
    AdminOrderListView,
    AdminOrderDetailView,
    AdminUserListView,
    AdminUserDetailView,
    AdminPaymentListView,
    AdminPaymentDetailView,
)

urlpatterns = [
    path(
        "dashboard/",
        AdminDashboardView.as_view(),
        name="admin-dashboard",
    ),
    path(
        "products/",
        AdminProductListView.as_view(),
        name="admin-product-list",
    ),
    path(
        "products/<int:pk>/",
        AdminProductDetailView.as_view(),
        name="admin-product-detail",
    ),
    path("categories/", AdminCategoryListView.as_view(), name="admin-category-list"),
    path(
        "categories/<int:pk>/",
        AdminCategoryDetailView.as_view(),
        name="admin-category-detail",
    ),
    path("orders/", AdminOrderListView.as_view(), name="admin-order-list"),
    path(
        "orders/<int:pk>/",
        AdminOrderDetailView.as_view(),
        name="admin-order-detail",
    ),
    path("users/", AdminUserListView.as_view(), name="admin-user-list"),
    path(
        "users/<int:pk>/",
        AdminUserDetailView.as_view(),
        name="admin-user-detail",
    ),
    path(
        "payments/",
        AdminPaymentListView.as_view(),
        name="admin-payment-list",
    ),
    path(
        "payments/<int:pk>/",
        AdminPaymentDetailView.as_view(),
        name="admin-payment-detail",
    ),
]
