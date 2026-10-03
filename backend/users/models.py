from django.contrib.auth.models import User
from django.db import models


class Address(models.Model):
    ADDRESS_TYPES = [
        ("home", "Home"),
        ("work", "Work"),
        ("other", "Other"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="addresses",
    )

    address_type = models.CharField(
        max_length=20,
        choices=ADDRESS_TYPES,
        default="home",
    )

    full_name = models.CharField(max_length=150)

    phone = models.CharField(max_length=20)

    address_line = models.CharField(max_length=255)

    city = models.CharField(max_length=100)

    state = models.CharField(max_length=100)

    pincode = models.CharField(max_length=10)

    is_default = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} - {self.city}"
