from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib import messages

def logout_view(request):
    logout(request)  # 현재 로그인된 사용자 세션을 종료
    messages.success(request, '로그아웃 되었습니다.')
    return redirect('uauth:main')  # 로그아웃 후 이동할 페이지

def withdraw_view(request):
    return render(request, 'chat/withdraw.html')

def chat_main(request):
    return render(request, 'chat/chat.html')
