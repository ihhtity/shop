from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from django.db import transaction
from django.utils import timezone
from datetime import datetime
from .models import Order, OrderItem
from .serializers import OrderSerializer, CreateOrderSerializer
from apps.goods.models import Goods, Specification
from apps.addresses.models import Address
from apps.coupons.models import UserCoupon
import random

class OrderListView(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        status = self.request.query_params.get('status')
        queryset = Order.objects.filter(user=self.request.user)
        if status:
            queryset = queryset.filter(status=status)
        return queryset.order_by('-created_at')

class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

class CreateOrderView(APIView):
    @transaction.atomic
    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        if serializer.is_valid():
            address = Address.objects.filter(id=serializer.validated_data['address_id'], user=request.user).first()
            if not address:
                return Response({'code': 30006, 'message': '收货地址不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
            order_no = f'{datetime.now().strftime("%Y%m%d%H%M%S")}{random.randint(1000, 9999)}'
            total_amount = 0
            discount_amount = 0
            items_data = []
            for item in serializer.validated_data['items']:
                goods = Goods.objects.filter(id=item['goods_id']).select_for_update().first()
                if not goods:
                    return Response({'code': 20001, 'message': '商品不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
                spec = None
                if item.get('spec_id'):
                    spec = Specification.objects.filter(id=item['spec_id'], goods=goods).select_for_update().first()
                    if not spec:
                        return Response({'code': 20005, 'message': '规格不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
                price = float(goods.price)
                if spec:
                    price += float(spec.price_offset)
                quantity = item['quantity']
                if goods.stock < quantity:
                    return Response({'code': 20003, 'message': '库存不足', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
                goods.stock -= quantity
                goods.sales += quantity
                goods.save()
                if spec:
                    spec.stock -= quantity
                    spec.save()
                subtotal = price * quantity
                total_amount += subtotal
                items_data.append({
                    'goods': goods,
                    'spec': spec,
                    'price': price,
                    'quantity': quantity,
                    'subtotal': subtotal
                })
            coupon = None
            coupon_id = serializer.validated_data.get('coupon_id')
            if coupon_id:
                coupon = UserCoupon.objects.filter(id=coupon_id, user=request.user, status=0).first()
                if coupon and coupon.coupon.min_spend <= total_amount:
                    if coupon.coupon.coupon_type == 1:
                        discount_amount = float(coupon.coupon.discount_amount)
                    elif coupon.coupon.coupon_type == 2:
                        discount_amount = total_amount * (1 - float(coupon.coupon.discount_rate))
                    elif coupon.coupon.coupon_type == 3:
                        discount_amount = float(coupon.coupon.discount_amount)
                    discount_amount = min(discount_amount, total_amount)
            pay_amount = max(total_amount - discount_amount, 0)
            order = Order.objects.create(
                order_no=order_no,
                user=request.user,
                address=address,
                total_amount=total_amount,
                discount_amount=discount_amount,
                pay_amount=pay_amount,
                remark=serializer.validated_data.get('remark', '')
            )
            for item in items_data:
                OrderItem.objects.create(
                    order=order,
                    goods=item['goods'],
                    goods_name=item['goods'].name,
                    goods_image=item['goods'].images[0] if item['goods'].images else '',
                    spec=item['spec'],
                    spec_name=f'{item["spec"].name}: {item["spec"].value}' if item['spec'] else '',
                    price=item['price'],
                    quantity=item['quantity'],
                    subtotal=item['subtotal']
                )
            if coupon:
                coupon.status = 1
                coupon.order = order
                coupon.used_time = timezone.now()
                coupon.save()
                coupon.coupon.used_count += 1
                coupon.coupon.save()
            return Response({'code': 0, 'message': '创建成功', 'data': {'order_id': order.id, 'order_no': order.order_no}})
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)

class CancelOrderView(APIView):
    def post(self, request, pk):
        order = Order.objects.filter(id=pk, user=request.user, status=0).first()
        if not order:
            return Response({'code': 30002, 'message': '订单状态错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        order.status = 4
        order.cancel_time = timezone.now()
        order.save()
        for item in order.orderitem_set.all():
            goods = Goods.objects.filter(id=item.goods_id).first()
            if goods:
                goods.stock += item.quantity
                goods.sales -= item.quantity
                goods.save()
            if item.spec:
                spec = Specification.objects.filter(id=item.spec_id).first()
                if spec:
                    spec.stock += item.quantity
                    spec.save()
        return Response({'code': 0, 'message': '取消成功', 'data': {}})

class ConfirmOrderView(APIView):
    def post(self, request, pk):
        order = Order.objects.filter(id=pk, user=request.user, status=2).first()
        if not order:
            return Response({'code': 30002, 'message': '订单状态错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        order.status = 3
        order.finish_time = timezone.now()
        order.save()
        return Response({'code': 0, 'message': '确认成功', 'data': {}})

class AdminOrderListView(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = OrderSerializer

    def get_queryset(self):
        status = self.request.query_params.get('status')
        order_no = self.request.query_params.get('order_no')
        queryset = Order.objects.all()
        if status:
            queryset = queryset.filter(status=status)
        if order_no:
            queryset = queryset.filter(order_no__icontains=order_no)
        return queryset.order_by('-created_at')

class AdminOrderUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer