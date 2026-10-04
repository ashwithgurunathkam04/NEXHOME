from django.urls import path

from .views import (
    AddToCartView,
    CartItemDeleteView,
    CartItemUpdateView,
    CartView,
)


urlpatterns = [
    path(
        "",
        CartView.as_view(),
        name="cart",
    ),
    path(
        "add/",
        AddToCartView.as_view(),
        name="cart-add",
    ),
    path(
        "items/<int:pk>/",
        CartItemUpdateView.as_view(),
        name="cart-item-update",
    ),
    path(
        "items/<int:pk>/delete/",
        CartItemDeleteView.as_view(),
        name="cart-item-delete",
    ),
]