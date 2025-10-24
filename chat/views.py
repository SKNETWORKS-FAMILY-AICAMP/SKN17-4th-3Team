from django.shortcuts import render, redirect
from chat.models import Chat, Chat_log
from uauth.models import User
from django.contrib.auth import logout
from django.contrib import messages

def logout_view(request):
    logout(request)  # 현재 로그인된 사용자 세션을 종료
    messages.success(request, '로그아웃 되었습니다.')
    return redirect('uauth:main')  # 로그아웃 후 이동할 페이지

def withdraw_view(request):
    return render(request, 'chat/withdraw.html')

def chat_main(request):
    user_id_get = 1
    chat_id_get = 2
    chat = Chat_log.objects.filter(user_id=user_id_get, chat_id=chat_id_get).order_by('created_at').values('question', 'answer')
    region = Chat.objects.get(id=chat_id_get)
    print(region.area)
    for c in chat:
        print(c['question'])
        print(c['answer'])

    return render(request, 'chat/chat.html', {'chat': chat, 'region': region.area})

def logout(request):
    return render(request, 'chat/logout.html')
