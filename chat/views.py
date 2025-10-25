from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth import authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

@login_required
def logout_view(request):
    logout(request)  # 현재 로그인된 사용자 세션을 종료
    messages.success(request, '로그아웃 되었습니다.')
    return redirect('uauth:main')  # 로그아웃 후 이동할 페이지

@login_required
def chat_main(request):
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
    
@login_required
def chat_choice(request):
    return render(request, 'chat/chat_choice.html')