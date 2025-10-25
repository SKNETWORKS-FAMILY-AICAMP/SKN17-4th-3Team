from django.contrib.auth import views as auth_views
from django.urls import path
from uauth import views

app_name = 'uauth'

urlpatterns = [
    path('',views.main, name='main'),
    path('login/',views.login_view,name='login'),
    path('signup/', views.signup, name='signup'),
    path('send_code/', views.send_verification_code, name='send_code'),
    path('verify_code/',views.verify_code,name='verify_code'),
    path('verify/', views.verify_code, name='verify'),
    path('check_email/', views.check_email, name='check_email'),
    path('findpw/',views.findpw, name='findpw'),
]