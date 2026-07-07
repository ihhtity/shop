from django.urls import path
from .views import ImageUploadView, FileUploadView

urlpatterns = [
    path('image/', ImageUploadView.as_view(), name='image_upload'),
    path('file/', FileUploadView.as_view(), name='file_upload'),
]