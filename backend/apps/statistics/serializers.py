from rest_framework import serializers

class DashboardSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    total_goods = serializers.IntegerField()
    total_orders = serializers.IntegerField()
    total_sales = serializers.DecimalField(max_digits=10, decimal_places=2)
    today_users = serializers.IntegerField()
    today_orders = serializers.IntegerField()
    today_sales = serializers.DecimalField(max_digits=10, decimal_places=2)

class SalesStatSerializer(serializers.Serializer):
    date = serializers.DateField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    orders = serializers.IntegerField()