from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from .models import PaymentRecord
from .serializers import PaymentRecordSerializer, PrepaySerializer
from apps.orders.models import Order

class PrepayView(APIView):
    def post(self, request):
        serializer = PrepaySerializer(data=request.data)
        if serializer.is_valid():
            order = Order.objects.filter(id=serializer.validated_data['order_id'], user=request.user, status=0, pay_status=0).first()
            if not order:
                return Response({'code': 30002, 'message': '订单状态错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
            pay_type = serializer.validated_data['pay_type']
            if pay_type not in [1, 2]:
                return Response({'code': 40001, 'message': '支付方式不支持', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
            PaymentRecord.objects.create(order=order, pay_type=pay_type, amount=order.pay_amount)
            return Response({
                'code': 0,
                'message': 'success',
                'data': {
                    'order_no': order.order_no,
                    'pay_params': {
                        'appId': 'wx_test_appid',
                        'timeStamp': str(int(timezone.now().timestamp())),
                        'nonceStr': 'test_nonce_str',
                        'package': f'prepay_id=prepay_{order.order_no}',
                        'signType': 'MD5',
                        'paySign': 'test_pay_sign'
                    }
                }
            })
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)

class WechatNotifyView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        order_no = request.data.get('out_trade_no')
        transaction_no = request.data.get('transaction_id')
        order = Order.objects.filter(order_no=order_no).first()
        if order and order.pay_status == 0:
            order.pay_status = 1
            order.status = 1
            order.pay_type = 1
            order.pay_time = timezone.now()
            order.save()
            payment = PaymentRecord.objects.filter(order=order).first()
            if payment:
                payment.transaction_no = transaction_no
                payment.status = 1
                payment.pay_time = timezone.now()
                payment.save()
        return Response({'code': 'SUCCESS', 'message': 'OK'})

class AlipayNotifyView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        order_no = request.data.get('out_trade_no')
        transaction_no = request.data.get('trade_no')
        order = Order.objects.filter(order_no=order_no).first()
        if order and order.pay_status == 0:
            order.pay_status = 1
            order.status = 1
            order.pay_type = 2
            order.pay_time = timezone.now()
            order.save()
            payment = PaymentRecord.objects.filter(order=order).first()
            if payment:
                payment.transaction_no = transaction_no
                payment.status = 1
                payment.pay_time = timezone.now()
                payment.save()
        return Response('success')

class PaymentStatusView(APIView):
    def get(self, request, order_id):
        order = Order.objects.filter(id=order_id, user=request.user).first()
        if not order:
            return Response({'code': 30001, 'message': '订单不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        payment = PaymentRecord.objects.filter(order=order).first()
        return Response({'code': 0, 'message': 'success', 'data': {'pay_status': order.pay_status, 'status': order.status}})