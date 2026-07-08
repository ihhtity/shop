from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Address
from .serializers import AddressSerializer


class AddressListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer
    pagination_class = None

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class AddressDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class AddressCreateView(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        if instance.is_default:
            Address.objects.filter(user=self.request.user, id__ne=instance.id).update(is_default=False)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({'code': 0, 'message': '创建成功', 'data': response.data})


class AddressUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.is_default:
            Address.objects.filter(user=self.request.user, id__ne=instance.id).update(is_default=False)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})


class AddressDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

    def perform_destroy(self, instance):
        instance.status = 0
        instance.save()

    def destroy(self, request, *args, **kwargs):
        self.perform_destroy(self.get_object())
        return Response({'code': 0, 'message': '删除成功', 'data': {}})


class SetDefaultAddressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        address = Address.objects.filter(id=pk, user=request.user, status=1).first()
        if not address:
            return Response({'code': 30006, 'message': '地址不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        Address.objects.filter(user=request.user).update(is_default=False)
        address.is_default = True
        address.save()
        return Response({'code': 0, 'message': '设置成功', 'data': {}})


class UserAddressListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer
    pagination_class = None

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class UserAddressCreateView(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        if instance.is_default:
            Address.objects.filter(user=self.request.user, id__ne=instance.id).update(is_default=False)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({'code': 0, 'message': '创建成功', 'data': response.data})


class UserAddressUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.is_default:
            Address.objects.filter(user=self.request.user, id__ne=instance.id).update(is_default=False)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})


class UserAddressDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

    def perform_destroy(self, instance):
        instance.status = 0
        instance.save()

    def destroy(self, request, *args, **kwargs):
        self.perform_destroy(self.get_object())
        return Response({'code': 0, 'message': '删除成功', 'data': {}})


class UserSetDefaultAddressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        address = Address.objects.filter(id=pk, user=request.user, status=1).first()
        if not address:
            return Response({'code': 30006, 'message': '地址不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        Address.objects.filter(user=request.user).update(is_default=False)
        address.is_default = True
        address.save()
        return Response({'code': 0, 'message': '设置成功', 'data': {}})


class AdminAddressListView(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AddressSerializer
    pagination_class = None

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        queryset = Address.objects.filter(status=1)
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class AdminAddressDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})

    def perform_destroy(self, instance):
        instance.status = 0
        instance.save()

    def destroy(self, request, *args, **kwargs):
        self.perform_destroy(self.get_object())
        return Response({'code': 0, 'message': '删除成功', 'data': {}})
