from rest_framework import serializers
from .models import Case, Property


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['qr_code'] # QR code is generated automatically so read only

class CaseSerializer(serializers.ModelSerializer):
    properties = PropertySerializer(many=True, read_only=True)

    class Meta:
        model = Case
        fields = '__all__'
