"""parkit URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import include
from django.conf.urls.static import static
from rest_auth.urls import LoginView,LogoutView,PasswordResetConfirmView
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),   
    path('', include('accounts.api.urls', namespace='users-api')),
    path('', include('rent.api.urls', namespace='rent-api')),
    path('', include('search.api.urls', namespace='search-api')),
    path('', include('vehicle.api.urls', namespace='vehicle-api')),
    path('', include('profile.api.urls', namespace='profile-api')),
    path('auth/', include('rest_auth.urls')),
    re_path(r'^auth/password/reset/confirm\?uid\=(?P<uidb64>[0-9A-Za-z_\-]+)\&authtoken\=(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', PasswordResetConfirmView.as_view(), name='reset password confirm')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Park It Malaysia Admin Page" 