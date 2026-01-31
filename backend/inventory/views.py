from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Case, Property
from .serializers import CaseSerializer, PropertySerializer

class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all().order_by('-created_at')
    serializer_class = CaseSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

@api_view(['GET'])
def dashboard_stats(request):
    total_cases = Case.objects.count()
    pending_cases = Case.objects.filter(status='PENDING').count()
    disposed_cases = Case.objects.filter(status='DISPOSED').count()
    
    return Response({
        "total_cases": total_cases,
        "pending_cases": pending_cases,
        "disposed_cases": disposed_cases
    })
