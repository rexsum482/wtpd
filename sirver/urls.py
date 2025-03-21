"""
URL configuration for sirver project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from wallets.views import WalletViewSet
from rest_framework.authtoken.views import ObtainAuthToken
from .views import serve_react_app

router = DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('wallets', WalletViewSet, basename='wallet')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', ObtainAuthToken.as_view(), name='authenticate'),
    path('verify/', UserViewSet.as_view({'get': 'verify'})),
    re_path(r"^(?:.*)/?$", serve_react_app),
]
