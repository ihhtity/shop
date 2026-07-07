from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.conf import settings
import os
from PIL import Image
from datetime import datetime

class ImageUploadView(APIView):
    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'code': 90005, 'message': '请选择文件', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        if file.content_type not in allowed_types:
            return Response({'code': 90005, 'message': '文件类型不支持', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        max_size = 10 * 1024 * 1024
        if file.size > max_size:
            return Response({'code': 90006, 'message': '文件大小超限', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        file_type = request.data.get('type', 'goods')
        upload_dir = os.path.join(settings.MEDIA_ROOT, 'images', file_type)
        os.makedirs(upload_dir, exist_ok=True)
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        extension = os.path.splitext(file.name)[1]
        filename = f'{timestamp}{extension}'
        filepath = os.path.join(upload_dir, filename)
        with open(filepath, 'wb') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        image = Image.open(filepath)
        width, height = image.size
        url = f'/media/images/{file_type}/{filename}'
        return Response({'code': 0, 'message': '上传成功', 'data': {'url': url, 'width': width, 'height': height, 'size': file.size}})

class FileUploadView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'code': 90005, 'message': '请选择文件', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        upload_dir = os.path.join(settings.MEDIA_ROOT, 'files')
        os.makedirs(upload_dir, exist_ok=True)
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        extension = os.path.splitext(file.name)[1]
        filename = f'{timestamp}{extension}'
        filepath = os.path.join(upload_dir, filename)
        with open(filepath, 'wb') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        url = f'/media/files/{filename}'
        return Response({'code': 0, 'message': '上传成功', 'data': {'url': url}})