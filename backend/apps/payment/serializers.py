from rest_framework import serializers
from .models import PaymentRecord

class PaymentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentRecord
        fields = ['id', 'order', 'transaction_no', 'pay_type', 'amount', 'status', 'pay_time']

class PrepaySerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    pay_type = serializers.IntegerField()