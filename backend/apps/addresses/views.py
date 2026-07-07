from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from .models import Address
from .serializers import AddressSerializer

class AddressListView(ListAPIView):
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

class AddressDetailView(RetrieveAPIView):
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

class AddressCreateView(CreateAPIView):
    serializer_class = AddressSerializer

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        if instance.is_default:
            Address.objects.filter(user=self.request.user, id__ne=instance.id).update(is_default=False)

class AddressUpdateView(UpdateAPIView):
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.is_default:
            Address.objects.filter(user=self.request.user, id__ne=instance.id).update(is_default=False)

class AddressDeleteView(DestroyAPIView):
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user, status=1)

    def perform_destroy(self, instance):
        instance.status = 0
        instance.save()

class SetDefaultAddressView(APIView):
    def post(self, request, pk):
        address = Address.objects.filter(id=pk, user=request.user, status=1).first()
        if not address:
            return Response({'code': 30006, 'message': '地址不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        Address.objects.filter(user=request.user).update(is_default=False)
        address.is_default = True
        address.save()
        return Response({'code': 0, 'message': '设置成功', 'data': {}})