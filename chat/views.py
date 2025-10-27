from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth import authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash
from django.http import JsonResponse
from chat.models import Chat, Chat_log
from django.views.decorators.csrf import csrf_exempt
from uauth.models import UserForm
import json, time
import re
import requests
from requests.exceptions import RequestException

@login_required
def logout_view(request):
    logout(request)  # 현재 로그인된 사용자 세션을 종료
    messages.success(request, '로그아웃 되었습니다.')
    return redirect('uauth:main')  # 로그아웃 후 이동할 페이지

@login_required
def chat_main(request, chat_id=None):
    # 로그인한 유저 ID
    user_id_get = request.user.id
    if chat_id:
        chat_id_get = chat_id
    else:
        if Chat.objects.filter(user_id=user_id_get).count():
            chat_id_get = Chat.objects.filter(user_id=user_id_get).order_by("-created_at")[0].id
            chat = Chat.objects.get(id=chat_id_get)
        else:
            chat_id_get = None
    print(user_id_get, chat_id_get)
    
    # 해당 user id의 chat, chats, chat_log 불러오기
    try:
        chat = Chat.objects.get(id=chat_id_get)
        if chat and chat.area:
            chat.area_clean = re.sub(r"\s*\(\d+\)\s*$", "", str(chat.area))
        else:
            chat.area_clean = chat.area or ""
    except:
        chat = None

    chat_log = Chat_log.objects.filter(chat_id=chat_id_get).order_by('created_at').values()
    if chat:
        print(chat.area)
    chats = Chat.objects.filter(user_id=user_id_get).order_by('-created_at')
    for c in chat_log:
        print(c['question'])
        print(c['answer'])
    return render(
        request, 
        'chat/chat.html', 
        {
            'user_id': user_id_get,
            'chat': chat, 
            'chats':chats,
            'chat_log': chat_log, 
            'active_chat_id':chat_id_get,
        })

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
    area = '전주'
    user_id = 3
    Chat.objects.create(
        area=area,
        user_id=user_id,
    )
    return render(request, 'chat/chat_choice.html')

@login_required
def save_message(request):
    # fetch로 요청 받으면 해당 응답 DB에 저장
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        chat_id = data.get('chat_id')
        question = data.get('question')

        ############### 여기 url 바꿔야됨 #################
        url = "https://3f1lkjqv3127e5-8000.proxy.runpod.net/"
        params = {
                "query": question,
            }

        try:
            response = requests.get(url, params=params, timeout=60)
            print(response.json())

            if response.status_code == 200:
                runpod_result = response.json() 

                # DB에 넣는건 일단 주석처리 해놨습니다
                chat_log = Chat_log.objects.create(
                    user_id=user_id,
                    chat_id=chat_id,
                    question=question,
                    answer=runpod_result.get('response')
                )
                
                return JsonResponse({
                    "status": "ok",
                    "answer": runpod_result.get("response")
                })
            
            else:
                # FastAPI 서버에서 500 에러 등이 발생한 경우
                return JsonResponse(
                    {"status": "error", "message": f"RunPod 에러: {response.status_code}"}, 
                    status=response.status_code
                )

        # 네트워크 연결 실패, 타임아웃 등
        except RequestException as e:
            return JsonResponse(
                {"status": "error", "message": f"RunPod 연결 실패: {e}"}, 
                status=503
            )
    # POST 요청이 아니면 요청이 잘못된거
    return JsonResponse({'status': 'error', 'message': "Invalid Request"})
    

@login_required
def create_chat(request):
    # fetch로 요청 받으면 해당 응답 DB에 저장
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        region = data.get('region')
        
        print('in create chat')
        print(user_id, region)

        # ✅ 같은 이름이 이미 존재하면 (1), (2), ... 붙이기
        base_name = region
        name = base_name
        counter = 1

        while Chat.objects.filter(user_id=user_id, area=name).exists():
            name = f"{base_name} ({counter})"
            counter += 1
        
        # ✅ 최종 이름으로 채팅 생성
        chat = Chat.objects.create(
            user_id=user_id,
            area=name,
        )

        return JsonResponse({
            "status": "ok",
            "id": chat.id,
            "region": chat.area  # 실제 저장된 이름 반환
        })
    
    return JsonResponse({'status': 'error', 'message': "Invalid Request"}, status=400)

@login_required
def delete_chat(request):
    # fetch로 요청 받으면 해당 챗 DB에서 삭제
    if request.method == 'DELETE':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        del_chat_ids = data.get('del_chat_ids')
        
        print('in delete chat')
        print(user_id, del_chat_ids)

        target = Chat.objects.filter(id__in=del_chat_ids)
        print(target)
        target.delete()
        # 마찬가지로 여기도 주석처리 했습니다
        # return JsonResponse({"status": "ok", "id": user_id, })
        return render(request, 'chat/chat.html')
    
    return JsonResponse({'status': 'error', 'message': "Invalid Request"}, status=400)

@login_required
def chat_list_view(request):
    chats = Chat.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'chat/chat.html', {'chats':chats})


@login_required
def check_old_password(request):
    old_pw = request.GET.get('old_pw')
    user = request.user

    if user.check_password(old_pw):
        return JsonResponse({'result': 'success'})
    else:
        return JsonResponse({'result': 'fail'})


@login_required
def change_password(request):
    # GET: 페이지 렌더 (주소창으로 들어왔을 때 JSON 에러 안 나게)
    if request.method == "GET":
        return render(request, "chat/changepw.html")  # 네 템플릿 경로에 맞춰줘

    # POST: 비밀번호 변경 처리
    old_pw = new_pw1 = new_pw2 = None

    # JSON 바디로 오는 경우
    if request.META.get("CONTENT_TYPE", "").startswith("application/json"):
        try:
            data = json.loads(request.body or "{}")
            old_pw = data.get("old_password")
            new_pw1 = data.get("new_password1")
            new_pw2 = data.get("new_password2")
        except Exception:
            return JsonResponse(
                {"result": "fail", "message": "요청 본문을 해석할 수 없습니다."},
                json_dumps_params={"ensure_ascii": False},
                status=400,
            )
    else:
        # 일반 폼 전송(FormData)인 경우
        old_pw = request.POST.get("old_password")
        new_pw1 = request.POST.get("new_password1")
        new_pw2 = request.POST.get("new_password2")

    user = request.user

    if not old_pw or not new_pw1 or not new_pw2:
        return JsonResponse(
            {"result": "fail", "message": "필수 값이 누락되었습니다."},
            json_dumps_params={"ensure_ascii": False},
            status=400,
        )
    

    if not user.check_password(old_pw):
        return JsonResponse(
            {"result": "fail", "message": "기존 비밀번호가 올바르지 않습니다."},
            json_dumps_params={"ensure_ascii": False},
            status=400,
        )
    # ✅ 기존 비밀번호와 새 비밀번호 동일한 경우
    if old_pw == new_pw1:
        return JsonResponse(
            {'result': 'fail', 'message': '기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.'},
            json_dumps_params={'ensure_ascii': False}
        )

    if new_pw1 != new_pw2:
        return JsonResponse(
            {"result": "fail", "message": "새 비밀번호가 일치하지 않습니다."},
            json_dumps_params={"ensure_ascii": False},
            status=400,
        )

    user.set_password(new_pw1)
    user.save()
    update_session_auth_hash(request, user)

    return JsonResponse(
        {"result": "success", "message": "비밀번호가 성공적으로 변경되었습니다."},
        json_dumps_params={"ensure_ascii": False},
    )