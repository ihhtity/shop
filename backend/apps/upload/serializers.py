from rest_framework import serializers

class ImageUploadSerializer(serializers.Serializer):
    file = serializers.ImageField()
    type = serializers.CharField(allow_blank=True, required=False)