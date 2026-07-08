from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Category, Goods, Specification
from .serializers import CategorySerializer, GoodsSerializer, GoodsListSerializer, SpecificationSerializer
from django.db.models import Q


class CategoryListView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.filter(parent=None, status=1)
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class CategoryDetailView(RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.filter(status=1)
    serializer_class = CategorySerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class GoodsListView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GoodsListSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Goods.objects.filter(is_on_sale=True)
        category_id = self.request.query_params.get('category_id')
        keyword = self.request.query_params.get('keyword')
        
        if category_id:
            category_ids = [int(category_id)]
            children = Category.objects.filter(parent_id=category_id, status=1).values_list('id', flat=True)
            category_ids.extend(list(children))
            queryset = queryset.filter(category_id__in=category_ids)
        
        if keyword:
            queryset = queryset.filter(Q(name__icontains=keyword) | Q(sku__icontains=keyword))
        
        return queryset.order_by('-sales', 'sort_order')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class GoodsDetailView(RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Goods.objects.filter(is_on_sale=True)
    serializer_class = GoodsSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class HotGoodsView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Goods.objects.filter(is_on_sale=True, is_hot=True)[:10]
    serializer_class = GoodsListSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class NewGoodsView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Goods.objects.filter(is_on_sale=True, is_new=True)[:10]
    serializer_class = GoodsListSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class AdminGoodsCreateView(CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({'code': 0, 'message': '创建成功', 'data': response.data})


class AdminGoodsUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})


class AdminGoodsDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Goods.objects.all()

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return Response({'code': 0, 'message': '删除成功', 'data': {}})


class AdminCategoryListView(ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({'code': 0, 'message': '创建成功', 'data': response.data})


class AdminCategoryDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

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


class SpecificationListView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SpecificationSerializer
    pagination_class = None

    def get_queryset(self):
        goods_id = self.request.query_params.get('goods_id')
        queryset = Specification.objects.all()
        if goods_id:
            queryset = queryset.filter(goods_id=goods_id)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class AdminSpecificationListView(ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({'code': 0, 'message': '创建成功', 'data': response.data})


class AdminSpecificationDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer

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
