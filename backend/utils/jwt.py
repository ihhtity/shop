import jwt
from datetime import datetime, timedelta
from django.conf import settings

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.now() + timedelta(hours=2),
        'iat': datetime.now()
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None