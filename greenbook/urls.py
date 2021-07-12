from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from users.views import logout


urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('', include('social_django.urls')),
    path('',include(('home.urls','home'), namespace='home')),
    path('karla/', admin.site.urls),
    path('api/',include(('api.urls','api'), namespace='api')),
    path('logout', logout),
    path('users/',include(('users.urls','users'), namespace='users')),
    #path('camera/',include(('camera.urls','camera'), namespace='camera')),
    #path('feed/',include(('feed.urls','feed'), namespace='feed'))
]

if settings.DEBUG: 
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    