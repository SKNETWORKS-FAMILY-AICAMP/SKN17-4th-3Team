from django.db import models
from django.contrib.auth.models import User

class Chat(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='chat')
    created_at = models.DateTimeField(auto_now_add=True)
    area = models.CharField(max_length=10)

class Chat_log(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.SET_NULL, null=True, blank=True, related_name='chat_log_chat')
    user = models.ForeignKey(Chat, on_delete=models.SET_NULL, null=True, blank=True, related_name='chat_log_user')
    question = models.CharField(max_length=500)
    answer = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)