from datetime import datetime
from rest_framework.views import exception_handler
from rest_framework.response import Response

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        error_code = getattr(exc, 'code', 90001)
        error_message = response.data.get('detail', '系统错误')
        response.data = {
            'code': error_code,
            'message': error_message,
            'data': {},
            'timestamp': int(datetime.now().timestamp())
        }
    return response

def bad_request(request, exception=None):
    return Response({
        'code': 90002,
        'message': '请求参数错误',
        'data': {},
        'timestamp': int(datetime.now().timestamp())
    }, status=400)

def permission_denied(request, exception=None):
    return Response({
        'code': 10010,
        'message': '权限不足',
        'data': {},
        'timestamp': int(datetime.now().timestamp())
    }, status=403)

def not_found(request, exception=None):
    return Response({
        'code': 90002,
        'message': '请求资源不存在',
        'data': {},
        'timestamp': int(datetime.now().timestamp())
    }, status=404)

def server_error(request, exception=None):
    return Response({
        'code': 90001,
        'message': '系统错误',
        'data': {},
        'timestamp': int(datetime.now().timestamp())
    }, status=500)