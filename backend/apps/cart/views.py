from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Cart
from .serializers import CartSerializer, CartCreateSerializer, CartUpdateSerializer


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart_items = Cart.objects.filter(user=request.user, status=1)
        serializer = CartSerializer(cart_items, many=True)
        items = serializer.data
        total_price = sum(item['subtotal'] for item in items)
        total_count = sum(item['quantity'] for item in items)
        return Response({'code': 0, 'message': 'success', 'data': {'items': items, 'total_price': total_price, 'total_count': total_count}})

    def post(self, request):
        goods = request.data.get('goods')
        spec = request.data.get('spec')
        quantity = request.data.get('quantity', 1)
        
        existing_cart = Cart.objects.filter(
            user=request.user,
            goods_id=goods,
            spec_id=spec,
            status=1
        ).first()
        
        if existing_cart:
            existing_cart.quantity += quantity
            existing_cart.save()
            return Response({'code': 0, 'message': '更新成功', 'data': {}})
        
        serializer = CartCreateSerializer(data={'goods': goods, 'spec': spec, 'quantity': quantity})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'code': 0, 'message': '添加成功', 'data': {}}, status=status.HTTP_201_CREATED)
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class CartItemUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartUpdateSerializer
    
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user, status=1)
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})


class CartItemDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user, status=1)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 0
        instance.save()
        return Response({'code': 0, 'message': '删除成功', 'data': {}})


class CartClearView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        Cart.objects.filter(user=request.user, status=1).update(status=0)
        return Response({'code': 0, 'message': '清空成功', 'data': {}})


class UserCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart_items = Cart.objects.filter(user=request.user, status=1)
        serializer = CartSerializer(cart_items, many=True)
        items = serializer.data
        total_price = sum(item['subtotal'] for item in items)
        total_count = sum(item['quantity'] for item in items)
        return Response({'code': 0, 'message': 'success', 'data': {'items': items, 'total_price': total_price, 'total_count': total_count}})

    def post(self, request):
        goods = request.data.get('goods')
        spec = request.data.get('spec')
        quantity = request.data.get('quantity', 1)
        
        existing_cart = Cart.objects.filter(
            user=request.user,
            goods_id=goods,
            spec_id=spec,
            status=1
        ).first()
        
        if existing_cart:
            existing_cart.quantity += quantity
            existing_cart.save()
            return Response({'code': 0, 'message': '更新成功', 'data': {}})
        
        serializer = CartCreateSerializer(data={'goods': goods, 'spec': spec, 'quantity': quantity})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'code': 0, 'message': '添加成功', 'data': {}}, status=status.HTTP_201_CREATED)
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class UserCartItemUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartUpdateSerializer
    
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user, status=1)
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})


class UserCartItemDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user, status=1)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 0
        instance.save()
        return Response({'code': 0, 'message': '删除成功', 'data': {}})


class UserCartClearView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        Cart.objects.filter(user=request.user, status=1).update(status=0)
        return Response({'code': 0, 'message': '清空成功', 'data': {}})


class AdminCartListView(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = CartSerializer
    pagination_class = None
    
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        queryset = Cart.objects.filter(status=1)
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class AdminCartDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 0
        instance.save()
        return Response({'code': 0, 'message': '删除成功', 'data': {}})
