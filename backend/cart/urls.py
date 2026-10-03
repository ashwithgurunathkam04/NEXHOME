from django.urls import path

from .views import AddToCartView, CartView


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
]
