from django.shortcuts import render, redirect
from django.contrib import messages, auth
from django.contrib.auth import authenticate, login as auth_login
from uauth.models import UserForm
from django.http import JsonResponse
from django.contrib.auth.models import User
import random
from django.core.mail import send_mail
from datetime import datetime, timedelta

def main(request):
    return render(request, 'uauth/main.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email') 
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            print("로그인 성공:", user)
            auth_login(request, user)
            return redirect('chat:chat_main')  # 로그인 성공 시 이동할 페이지
        else:
            print("로그인 실패")
            messages.error(request, '이메일과 비밀번호를 확인해주세요.')
    return redirect('uauth:main')


def signup(request):
    if request.method == 'POST':
        form = UserForm(request.POST, request.FILES)

        if form.is_valid():
            print(form.cleaned_data['username'])
            print(form.cleaned_data['email'])
            user = form.save()
            messages.success(request, '회원가입 완료!')

            return redirect('uauth:main')
    else:
        form = UserForm()
    
    return render(request, 'uauth/signup.html', {'form':form}) 

# 이메일 인증코드 전송
def send_verification_code(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({'error': '이메일을 입력해주세요.'}, status=400)

    code = str(random.randint(100000, 999999))
    now = datetime.now()

    request.session['verification_code'] = code
    request.session['verification_email'] = email
    request.session['verification_time'] = now.strftime('%Y-%m-%d %H:%M:%S')

    send_mail(
        '안녕하세요. 떠나봄입니다.\n회원가입 인증코드 보내드립니다.',
        f'인증코드 : {code}\n5분 이내에 인증코드를 정확히 입력해주세요.',
        'pinokiojs@gmail.com',
        [email],
        fail_silently=False,
    )

    return JsonResponse({'message': '인증 코드가 전송되었습니다! (5분간 유효)'})

# 인증코드 검증
def verify_code(request):
    user_code = request.GET.get('code')
    email = request.GET.get('email')

    session_code = request.session.get('verification_code')
    session_email = request.session.get('verification_email')
    session_time_str = request.session.get('verification_time')

    if not all([session_code, session_email, session_time_str]):
        return JsonResponse({'result': 'expired'})

    session_time = datetime.strptime(session_time_str, '%Y-%m-%d %H:%M:%S')
    now = datetime.now()

    # 5분 유효기간 체크
    if now > session_time + timedelta(minutes=5):
        return JsonResponse({'result': 'timeout'})

    if email == session_email and user_code == session_code:
        return JsonResponse({'result': 'success'})
    else:
        return JsonResponse({'result': 'fail'})

def check_email(request):
    email = request.GET.get('email')
    exists = User.objects.filter(username=email).exists()
    return JsonResponse({'exists':exists})  

# 회원가입 완료 페이지
def signup_success(request):
    return render(request, 'uauth/signup_success.html')

def findpw(request):
    return render(request, 'uauth/findpw.html')