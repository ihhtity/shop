from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from datetime import datetime
from .models import User, AdminUser
from .serializers import (
    UserSerializer, UserRegisterSerializer, UserLoginSerializer, WechatLoginSerializer,
    AdminUserSerializer, AdminRegisterSerializer, AdminLoginSerializer
)


class UserRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'code': 0, 'message': '注册成功', 'data': {'id': user.id}}, status=status.HTTP_201_CREATED)
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(username=serializer.validated_data['username'])
                if user.is_active and user.check_password(serializer.validated_data['password']):
                    user.last_login = datetime.now()
                    user.save()
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'code': 0,
                        'message': '登录成功',
                        'data': {
                            'token': str(refresh.access_token),
                            'user': UserSerializer(user).data
                        }
                    })
                return Response({'code': 10002, 'message': '用户名或密码错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'code': 10002, 'message': '用户名或密码错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class WechatLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = WechatLoginSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data['code']
            openid = 'test_openid_' + code
            try:
                user = User.objects.get(openid=openid)
            except User.DoesNotExist:
                user = User.objects.create(username=f'wx_{openid}', openid=openid, password=make_password(openid))
            refresh = RefreshToken.for_user(user)
            return Response({
                'code': 0,
                'message': '登录成功',
                'data': {
                    'token': str(refresh.access_token),
                    'user': UserSerializer(user).data
                }
            })
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'code': 0, 'message': '退出成功', 'data': {}})
        except Exception as e:
            return Response({'code': 90001, 'message': str(e), 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class UserInfoView(APIView):
    def get(self, request):
        return Response({'code': 0, 'message': 'success', 'data': UserSerializer(request.user).data})

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'code': 0, 'message': '更新成功', 'data': serializer.data})
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class UserChangePasswordView(APIView):
    def put(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        if not request.user.check_password(old_password):
            return Response({'code': 10002, 'message': '原密码错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        request.user.set_password(new_password)
        request.user.save()
        return Response({'code': 0, 'message': '密码修改成功', 'data': {}})


class AdminRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = AdminRegisterSerializer(data=request.data)
        if serializer.is_valid():
            admin = serializer.save()
            return Response({'code': 0, 'message': '注册成功', 'data': {'id': admin.id}}, status=status.HTTP_201_CREATED)
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class AdminLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                admin = AdminUser.objects.get(username=serializer.validated_data['username'])
                if admin.is_active and admin.check_password(serializer.validated_data['password']):
                    admin.last_login = datetime.now()
                    admin.save()
                    refresh = RefreshToken.for_user(admin)
                    return Response({
                        'code': 0,
                        'message': '登录成功',
                        'data': {
                            'token': str(refresh.access_token),
                            'user': AdminUserSerializer(admin).data
                        }
                    })
                return Response({'code': 10002, 'message': '用户名或密码错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
            except AdminUser.DoesNotExist:
                return Response({'code': 10002, 'message': '用户名或密码错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class AdminLogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'code': 0, 'message': '退出成功', 'data': {}})
        except Exception as e:
            return Response({'code': 90001, 'message': str(e), 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class AdminInfoView(APIView):
    def get(self, request):
        admin = AdminUser.objects.get(id=request.user.id)
        return Response({'code': 0, 'message': 'success', 'data': AdminUserSerializer(admin).data})

    def put(self, request):
        admin = AdminUser.objects.get(id=request.user.id)
        serializer = AdminUserSerializer(admin, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'code': 0, 'message': '更新成功', 'data': serializer.data})
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)


class AdminChangePasswordView(APIView):
    def put(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        admin = AdminUser.objects.get(id=request.user.id)
        if not admin.check_password(old_password):
            return Response({'code': 10002, 'message': '原密码错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        admin.set_password(new_password)
        admin.save()
        return Response({'code': 0, 'message': '密码修改成功', 'data': {}})


class UserListView(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class UserDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class UserUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})


class UserDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return Response({'code': 0, 'message': '删除成功', 'data': {}})


class AdminListView(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = AdminUser.objects.all()
    serializer_class = AdminUserSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class AdminDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = AdminUser.objects.all()
    serializer_class = AdminUserSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class AdminUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = AdminUser.objects.all()
    serializer_class = AdminUserSerializer

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({'code': 0, 'message': '更新成功', 'data': response.data})


class AdminDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = AdminUser.objects.all()

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return Response({'code': 0, 'message': '删除成功', 'data': {}})
