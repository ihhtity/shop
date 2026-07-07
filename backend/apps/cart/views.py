from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.cache import cache
from apps.goods.models import Goods, Specification
import json

class CartView(APIView):
    def get(self, request):
        cart_data = cache.get(f'cart:{request.user.id}')
        if cart_data:
            cart_items = json.loads(cart_data)
        else:
            cart_items = []
        total_price = 0
        total_count = 0
        for item in cart_items:
            goods = Goods.objects.filter(id=item['goods_id']).first()
            if goods:
                item['goods_name'] = goods.name
                item['goods_image'] = goods.images[0] if goods.images else ''
                spec = Specification.objects.filter(id=item.get('spec_id')).first()
                if spec:
                    item['spec_name'] = f'{spec.name}: {spec.value}'
                    item['price'] = float(goods.price) + float(spec.price_offset)
                else:
                    item['spec_name'] = ''
                    item['price'] = float(goods.price)
                item['subtotal'] = item['price'] * item['quantity']
                total_price += item['subtotal']
                total_count += item['quantity']
        return Response({'code': 0, 'message': 'success', 'data': {'items': cart_items, 'total_price': total_price, 'total_count': total_count}})

    def post(self, request):
        goods_id = request.data.get('goods_id')
        spec_id = request.data.get('spec_id')
        quantity = request.data.get('quantity', 1)
        goods = Goods.objects.filter(id=goods_id).first()
        if not goods:
            return Response({'code': 20001, 'message': '商品不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        cart_data = cache.get(f'cart:{request.user.id}')
        if cart_data:
            cart_items = json.loads(cart_data)
        else:
            cart_items = []
        found = False
        for item in cart_items:
            if item['goods_id'] == goods_id and item.get('spec_id') == spec_id:
                item['quantity'] += quantity
                found = True
                break
        if not found:
            cart_items.append({'goods_id': goods_id, 'spec_id': spec_id, 'quantity': quantity})
        cache.set(f'cart:{request.user.id}', json.dumps(cart_items), timeout=7*24*3600)
        return Response({'code': 0, 'message': '添加成功', 'data': {}})

    def put(self, request):
        item_id = request.data.get('id')
        quantity = request.data.get('quantity')
        cart_data = cache.get(f'cart:{request.user.id}')
        if cart_data:
            cart_items = json.loads(cart_data)
            if 0 <= item_id < len(cart_items):
                cart_items[item_id]['quantity'] = quantity
                cache.set(f'cart:{request.user.id}', json.dumps(cart_items), timeout=7*24*3600)
                return Response({'code': 0, 'message': '更新成功', 'data': {}})
        return Response({'code': 90002, 'message': '购物车项不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)

class CartItemDeleteView(APIView):
    def delete(self, request, pk):
        cart_data = cache.get(f'cart:{request.user.id}')
        if cart_data:
            cart_items = json.loads(cart_data)
            if 0 <= pk < len(cart_items):
                del cart_items[pk]
                cache.set(f'cart:{request.user.id}', json.dumps(cart_items), timeout=7*24*3600)
                return Response({'code': 0, 'message': '删除成功', 'data': {}})
        return Response({'code': 90002, 'message': '购物车项不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)

class CartClearView(APIView):
    def post(self, request):
        cache.delete(f'cart:{request.user.id}')
        return Response({'code': 0, 'message': '清空成功', 'data': {}})