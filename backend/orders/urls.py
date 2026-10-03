from django.urls import path

from .views import (
    CancelOrderView,
    CreateOrderView,
    OrderDetailView,
    OrderListView,
)

urlpatterns = [
    path("", OrderListView.as_view(), name="order-list"),
    path("create/", CreateOrderView.as_view(), name="order-create"),
    path("<int:pk>/cancel/", CancelOrderView.as_view(), name="order-cancel"),
    path("<int:pk>/", OrderDetailView.as_view(), name="order-detail"),
]
