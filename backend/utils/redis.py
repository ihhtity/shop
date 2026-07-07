import redis
from django.conf import settings

redis_client = redis.from_url(settings.REDIS_URL)

def get_redis_client():
    return redis_client

def cache_set(key, value, timeout=None):
    redis_client.set(key, value, ex=timeout)

def cache_get(key):
    return redis_client.get(key)

def cache_delete(key):
    redis_client.delete(key)

def cache_exists(key):
    return redis_client.exists(key)