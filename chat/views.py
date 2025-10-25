from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth import authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from chat.models import Chat, Chat_log

@login_required
def logout_view(request):
    logout(request)  # 현재 로그인된 사용자 세션을 종료
    messages.success(request, '로그아웃 되었습니다.')
    return redirect('uauth:main')  # 로그아웃 후 이동할 페이지

@login_required
def chat_main(request):
    # 로그인한 유저 ID
    user_id_get = request.user.id
    # 불러올 가장 최신 Chat 
    chat_id_get = Chat.objects.filter(user_id=user_id_get).order_by("created_at")[0].id
    print(user_id_get, chat_id_get)
    # Chat_log의 question, answer 불러오기. Chat의 region 불러오기
    chat = Chat_log.objects.filter(user_id=user_id_get, chat_id=chat_id_get).order_by('created_at').values('question', 'answer')
    region = Chat.objects.get(id=chat_id_get)
    print(region.area)
    for c in chat:
        print(c['question'])
        print(c['answer'])
    return render(request, 'chat/chat.html')

@login_required
def withdraw_view(request):
    if request.method == 'GET':
        return render(request, 'chat/withdraw.html')

    if request.method == 'POST':
        password = request.POST.get('password')
        user = request.user
        print(password, user)

        # 비밀번호 확인
        if not user.check_password(password):
            return JsonResponse({'success': False, 'message': '일치하지 않는 비밀번호입니다.'})

        # 회원 삭제
        user.delete()
        logout(request)
        return JsonResponse({'success': True, 'message': '회원 탈퇴가 완료되었습니다.'})
    

def chat_choice(request):
    return render(request, 'chat/chat_choice.html')