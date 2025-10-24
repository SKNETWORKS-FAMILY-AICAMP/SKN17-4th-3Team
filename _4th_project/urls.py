"""
URL configuration for _4th_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path,include
from django.views.generic import RedirectView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('',RedirectView.as_view(url='uauth/')),
    path('uauth/', include('uauth.urls')),
    path('chat/', include('chat.urls')),
    path('chat_choice/', views.chat_choice, name='chat_choice'),
    path('delete_chat/', views.delete_chat, name='delete_chat'),
    path('deleted_chat/', views.deleted_chat, name='deleted_chat'),
    
]
