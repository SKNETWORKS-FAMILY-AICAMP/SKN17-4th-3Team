from django.shortcuts import render

def withdraw_view(request):
    return render(request, 'chat/withdraw.html')

def chat_main(request):
    return render(request, 'chat/chat.html')

def logout(request):
    return render(request, 'chat/logout.html')