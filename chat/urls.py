from django.contrib.auth import views as auth_views
from django.urls import path
from chat import views

app_name = 'chat'

urlpatterns = [
    path('',views.chat_main, name='chat_main'),
    path('withdraw/', views.withdraw_view, name='withdraw'),
    path('logout/',views.logout_view, name='logout'),
    path('chat_choice/', views.chat_choice, name='chat_choice'),
    path('save_message/', views.save_message, name='save_message'),
    path('chat_list/', views.chat_list_view, name='chat_list'),
    path('<int:chat_id>/', views.chat_main, name='chat_main_with_id'),
    path('create_chat/', views.create_chat, name='create_chat'),
    path('delete_chat/', views.delete_chat, name='delete_chat'),
    path('change_pw/', views.change_password, name='change_pw'),
    path('check_old_password/',views.check_old_password,name="check_old_password"),
]