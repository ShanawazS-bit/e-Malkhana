from rest_framework import serializers
from .models import Case, Property, PropertyMovement

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['qr_code']

class PropertyMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyMovement
        fields = '__all__'

class CaseSerializer(serializers.ModelSerializer):
    properties = PropertySerializer(many=True, read_only=True)

    class Meta:
        model = Case
        fields = '__all__'
