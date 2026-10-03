from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    AddressDetailView,
    AddressListCreateView,
    ProfileView,
    RegisterView,
)


urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),
    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="token-obtain-pair",
    ),
    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="token-refresh",
    ),
    path(
        "profile/",
        ProfileView.as_view(),
        name="profile",
    ),
    path(
        "addresses/",
        AddressListCreateView.as_view(),
        name="address-list-create",
    ),
    path(
        "addresses/<int:pk>/",
        AddressDetailView.as_view(),
        name="address-detail",
    ),
]
