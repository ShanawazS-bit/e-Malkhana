from django.urls import path, include
from .views import hello_world, register_user, login_user

# Setup API routes for the 'api' app
urlpatterns = [
    path('inventory/', include('inventory.urls')),
    # Endpoint: /api/hello/
    path('hello/', hello_world, name='hello_world'),
    
    # Endpoint: /api/register/
    path('register/', register_user, name='register_user'),
    
    # Endpoint: /api/login/
    path('login/', login_user, name='login_user'),
]

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
