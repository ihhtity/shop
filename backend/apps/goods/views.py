from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from .models import Category, Goods, Specification
from .serializers import CategorySerializer, GoodsSerializer, GoodsListSerializer, SpecificationSerializer
from django.db.models import Q

class CategoryListView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.filter(parent=None, status=1)
    serializer_class = CategorySerializer

class CategoryDetailView(RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.filter(status=1)
    serializer_class = CategorySerializer

class GoodsListView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GoodsListSerializer

    def get_queryset(self):
        queryset = Goods.objects.filter(is_on_sale=True)
        category_id = self.request.query_params.get('category_id')
        keyword = self.request.query_params.get('keyword')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        if keyword:
            queryset = queryset.filter(Q(name__icontains=keyword) | Q(sku__icontains=keyword))
        return queryset

class GoodsDetailView(RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Goods.objects.filter(is_on_sale=True)
    serializer_class = GoodsSerializer

class HotGoodsView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Goods.objects.filter(is_on_sale=True, is_hot=True)[:10]
    serializer_class = GoodsListSerializer

class NewGoodsView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Goods.objects.filter(is_on_sale=True, is_new=True)[:10]
    serializer_class = GoodsListSerializer

class AdminGoodsCreateView(CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer

class AdminGoodsUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer

class AdminGoodsDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Goods.objects.all()