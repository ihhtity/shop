from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, WechatLoginSerializer

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'code': 0, 'message': '注册成功', 'data': {'id': user.id}}, status=status.HTTP_201_CREATED)
        return Response({'code': 90002, 'message': serializer.errors, 'data': {}}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'code': 0,
                    'message': '登录成功',
                    'data': {
                        'token': str(refresh.access_token),
                        'user': UserSerializer(user).data
                    }
                })
            return Response({'code': 10002, 'message': '密码错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
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

class LogoutView(APIView):
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

class ChangePasswordView(APIView):
    def put(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        if not request.user.check_password(old_password):
            return Response({'code': 10002, 'message': '原密码错误', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        request.user.set_password(new_password)
        request.user.save()
        return Response({'code': 0, 'message': '密码修改成功', 'data': {}})

class UserListView(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()