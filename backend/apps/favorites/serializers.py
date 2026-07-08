from rest_framework import serializers
from .models import Favorite
from apps.goods.serializers import GoodsSerializer


class FavoriteSerializer(serializers.ModelSerializer):
    goods = GoodsSerializer()

    class Meta:
        model = Favorite
        fields = ['id', 'goods', 'status', 'created_at']