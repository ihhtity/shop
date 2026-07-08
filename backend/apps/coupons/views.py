from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.utils import timezone
from .models import Coupon, UserCoupon
from .serializers import CouponSerializer, UserCouponSerializer


class CouponListView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CouponSerializer
    pagination_class = None

    def get_queryset(self):
        now = timezone.now()
        return Coupon.objects.filter(status=1, start_time__lte=now, end_time__gte=now)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class CouponDetailView(RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Coupon.objects.filter(status=1)
    serializer_class = CouponSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class ReceiveCouponView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        coupon = Coupon.objects.filter(id=pk, status=1).first()
        if not coupon:
            return Response({'code': 50001, 'message': '优惠券不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        now = timezone.now()
        if coupon.start_time > now:
            return Response({'code': 50002, 'message': '优惠券未生效', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        if coupon.end_time < now:
            return Response({'code': 50002, 'message': '优惠券已过期', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        if coupon.used_count >= coupon.total_count:
            return Response({'code': 50003, 'message': '优惠券已领完', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        user_count = UserCoupon.objects.filter(user=request.user, coupon=coupon).count()
        if user_count >= coupon.per_user_limit:
            return Response({'code': 50004, 'message': '已达到领取上限', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        UserCoupon.objects.create(user=request.user, coupon=coupon)
        return Response({'code': 0, 'message': '领取成功', 'data': {}})


class MyCouponListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserCouponSerializer
    pagination_class = None

    def get_queryset(self):
        status = self.request.query_params.get('status')
        queryset = UserCoupon.objects.filter(user=self.request.user)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class UserCouponListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserCouponSerializer
    pagination_class = None

    def get_queryset(self):
        status = self.request.query_params.get('status')
        queryset = UserCoupon.objects.filter(user=self.request.user)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class UserReceiveCouponView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        coupon = Coupon.objects.filter(id=pk, status=1).first()
        if not coupon:
            return Response({'code': 50001, 'message': '优惠券不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        now = timezone.now()
        if coupon.start_time > now:
            return Response({'code': 50002, 'message': '优惠券未生效', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        if coupon.end_time < now:
            return Response({'code': 50002, 'message': '优惠券已过期', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        if coupon.used_count >= coupon.total_count:
            return Response({'code': 50003, 'message': '优惠券已领完', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        user_count = UserCoupon.objects.filter(user=request.user, coupon=coupon).count()
        if user_count >= coupon.per_user_limit:
            return Response({'code': 50004, 'message': '已达到领取上限', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        UserCoupon.objects.create(user=request.user, coupon=coupon)
        return Response({'code': 0, 'message': '领取成功', 'data': {}})


class AdminCouponListView(ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({'code': 0, 'message': '创建成功', 'data': response.data})


class AdminCouponDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return Response({'code': 0, 'message': '删除成功', 'data': {}})
