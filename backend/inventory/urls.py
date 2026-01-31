from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CaseViewSet, PropertyViewSet, dashboard_stats

router = DefaultRouter()
router.register(r'cases', CaseViewSet)
router.register(r'properties', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard-stats/', dashboard_stats, name='dashboard_stats'),
]
