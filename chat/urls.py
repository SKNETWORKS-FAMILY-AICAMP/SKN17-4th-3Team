from django.contrib.auth import views as auth_views
from django.urls import path
from chat import views

app_name = 'chat'

urlpatterns = [
    path('',views.chat_main, name='chat_main'),
    path('withdraw/', views.withdraw_view, name='withdraw'),
    path('logout/',views.logout, name='logout'),
]