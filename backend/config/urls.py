from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", include("products.urls")),
    path("api/auth/", include("users.urls")),
    path("api/cart/", include("cart.urls")),
]
