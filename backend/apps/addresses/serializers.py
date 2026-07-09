from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    status = serializers.IntegerField(read_only=True)

    class Meta:
        model = Address
        fields = ['id', 'user_id', 'name', 'phone', 'province', 'city', 'district', 'detail', 'is_default', 'status']
        read_only_fields = ['id', 'user_id', 'status']