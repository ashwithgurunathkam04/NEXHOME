from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import Address


# Remove Django's default User admin registration
admin.site.unregister(User)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "user",
        "full_name",
        "phone",
        "city",
        "state",
        "pincode",
        "address_type",
        "is_default",
    ]

    list_filter = [
        "address_type",
        "is_default",
        "state",
        "city",
    ]

    search_fields = [
        "user__username",
        "user__email",
        "full_name",
        "phone",
        "city",
        "pincode",
    ]

    ordering = ["-created_at"]


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = [
        "id",
        "username",
        "email",
        "first_name",
        "last_name",
        "is_staff",
        "is_active",
    ]

    search_fields = [
        "username",
        "email",
        "first_name",
        "last_name",
    ]

    list_filter = [
        "is_staff",
        "is_active",
        "is_superuser",
    ]
