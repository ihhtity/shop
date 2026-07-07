from django.core.cache import cache
from django.http import JsonResponse

class RateLimitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.rate_limit = 60
        self.time_window = 60

    def __call__(self, request):
        client_ip = request.META.get('REMOTE_ADDR')
        path = request.path
        key = f'rate_limit:{client_ip}:{path}'
        count = cache.get(key, 0)
        if count >= self.rate_limit:
            return JsonResponse({'code': 90003, 'message': '请求过于频繁', 'data': {}}, status=429)
        cache.set(key, count + 1, timeout=self.time_window)
        response = self.get_response(request)
        return response