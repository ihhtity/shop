from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'nickname', 'phone', 'email', 'avatar', 'gender', 'birth_date', 'is_admin']
        read_only_fields = ['id', 'is_admin']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    code = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'phone', 'code']

    def create(self, validated_data):
        validated_data.pop('code')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class WechatLoginSerializer(serializers.Serializer):
    code = serializers.CharField()