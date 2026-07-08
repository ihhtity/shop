from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, DestroyAPIView
from .models import Favorite
from .serializers import FavoriteSerializer


class FavoriteListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user, status=1)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class FavoriteCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        goods_id = request.data.get('goods_id')
        if not goods_id:
            return Response({'code': 90002, 'message': '商品ID不能为空', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        
        existing = Favorite.objects.filter(user=request.user, goods_id=goods_id, status=1).first()
        if existing:
            return Response({'code': 90003, 'message': '已收藏', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        
        Favorite.objects.create(user=request.user, goods_id=goods_id)
        return Response({'code': 0, 'message': '收藏成功', 'data': {}}, status=status.HTTP_201_CREATED)


class FavoriteDestroyView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user, status=1)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 0
        instance.save()
        return Response({'code': 0, 'message': '取消收藏成功', 'data': {}})


class FavoriteCheckView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        goods_id = request.query_params.get('goods_id')
        if not goods_id:
            return Response({'code': 90002, 'message': '商品ID不能为空', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        
        exists = Favorite.objects.filter(user=request.user, goods_id=goods_id, status=1).exists()
        return Response({'code': 0, 'message': 'success', 'data': {'is_favorite': exists}})