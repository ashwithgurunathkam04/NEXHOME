from django.urls import path

from .views import SimulatePaymentView


urlpatterns = [
    path(
        "simulate/",
        SimulatePaymentView.as_view(),
        name="simulate-payment",
    ),
]
