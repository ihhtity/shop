from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from django.db.models import Sum, Count
from apps.users.models import User
from apps.goods.models import Goods
from apps.orders.models import Order

class DashboardView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        today = timezone.now().date()
        total_users = User.objects.count()
        total_goods = Goods.objects.count()
        total_orders = Order.objects.count()
        total_sales = Order.objects.filter(pay_status=1).aggregate(total=Sum('pay_amount'))['total'] or 0
        today_users = User.objects.filter(date_joined__date=today).count()
        today_orders = Order.objects.filter(created_at__date=today).count()
        today_sales = Order.objects.filter(created_at__date=today, pay_status=1).aggregate(total=Sum('pay_amount'))['total'] or 0
        return Response({
            'code': 0,
            'message': 'success',
            'data': {
                'total_users': total_users,
                'total_goods': total_goods,
                'total_orders': total_orders,
                'total_sales': float(total_sales),
                'today_users': today_users,
                'today_orders': today_orders,
                'today_sales': float(today_sales)
            }
        })

class SalesStatView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        days = int(request.query_params.get('days', 7))
        end_date = timezone.now().date()
        sales_data = []
        for i in range(days):
            date = end_date - timezone.timedelta(days=i)
            orders = Order.objects.filter(created_at__date=date, pay_status=1)
            amount = orders.aggregate(total=Sum('pay_amount'))['total'] or 0
            sales_data.append({
                'date': str(date),
                'amount': float(amount),
                'orders': orders.count()
            })
        sales_data.reverse()
        return Response({'code': 0, 'message': 'success', 'data': sales_data})

class UserStatView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        days = int(request.query_params.get('days', 7))
        end_date = timezone.now().date()
        user_data = []
        for i in range(days):
            date = end_date - timezone.timedelta(days=i)
            count = User.objects.filter(date_joined__date=date).count()
            user_data.append({'date': str(date), 'count': count})
        user_data.reverse()
        return Response({'code': 0, 'message': 'success', 'data': user_data})

class GoodsStatView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        goods = Goods.objects.annotate(order_count=Count('orderitem')).order_by('-order_count')[:10]
        data = []
        for g in goods:
            data.append({'id': g.id, 'name': g.name, 'sales': g.sales, 'stock': g.stock})
        return Response({'code': 0, 'message': 'success', 'data': data})