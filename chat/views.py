from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth import authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from chat.models import Chat, Chat_log
from django.views.decorators.csrf import csrf_exempt
import json, time

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
    
def chat_choice(request):
    area = '전주'
    user_id = 3
    Chat.objects.create(
        area=area,
        user_id=user_id,
    )
    return render(request, 'chat/chat_choice.html')

def save_message(request):
    # fetch로 요청 받으면 해당 응답 DB에 저장
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        chat_id = data.get('chat_id')
        question = data.get('question')
        
        time.sleep(5)
        answer = f"{question}에 대한 응답 생성"
        print(user_id, chat_id, question, answer)
        
        # DB에 넣는건 일단 주석처리 해놨습니다
        chat_log = Chat_log.objects.create(
            user_id=user_id,
            chat_id=chat_id,
            question=question,
            answer=answer
        )
        print('응답 생성 완료')

        # 마찬가지로 여기도 주석처리 했습니다
        return JsonResponse({"status": "ok", "id": chat_log.id, "answer": answer})
        # return JsonResponse({"status": "ok", "id": user_id, "answer": answer})
    
    return JsonResponse({'status': 'error', 'message': "Invalid Request"}, status=400)
    

def create_chat(request):
    # fetch로 요청 받으면 해당 응답 DB에 저장
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        region = data.get('region')
        
        print('in create chat')
        print(user_id, region)
        
        # DB에 넣는건 일단 주석처리 해놨습니다
        chat = Chat.objects.create(
            user_id=user_id,
            area=region,
        )

        # 마찬가지로 여기도 주석처리 했습니다
        return JsonResponse({"status": "ok", "id": chat.id, "region": region})
        # return JsonResponse({"status": "ok", "id": user_id, "region": region})
    
    return JsonResponse({'status': 'error', 'message': "Invalid Request"}, status=400)
    
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
    
def chat_list_view(request):
    chats = Chat.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'chat/chat.html', {'chats':chats})
