from django import forms
from django.db import models, transaction
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class UserDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=10)

class UserForm(UserCreationForm):
    email = forms.EmailField(label='이메일', widget=forms.EmailInput(attrs={'placeholder':'이메일을 입력하세요'}))
    nickname = forms.CharField(label='닉네임', widget=forms.TextInput(attrs={'placeholder':'닉네임을 입력하세요'}))
    password1 = forms.CharField(
        label='비밀번호',
        widget=forms.PasswordInput(attrs={'placeholder': '비밀번호를 입력하세요'})
    )
    password2 = forms.CharField(
        label='비밀번호 확인',
        widget=forms.PasswordInput(attrs={'placeholder': '비밀번호를 다시 입력하세요'})
    )
    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'email')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'username' in self.fields:
            self.fields['username'].widget = forms.HiddenInput()
            self.fields['username'].required = False            

    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get('email')

        if email:
            if User.objects.filter(username=email).exists():
                self.add_error('email', '이미 이 이메일로 가입한 사용자가 있습니다.')
            
            #################### 필요없을듯 ##########################
            # elif User.objects.filter(email=email).exists():
            #     self.add_error('email', '이미 사용 중인 이메일 주소입니다.')
            #################### 필요없을듯 ##########################
            else:
                cleaned_data['username'] = email
        
        return cleaned_data
    
    @transaction.atomic # DB 트랜잭션 설정
    def save(self, commit=True):
        """
        폼 저장 메서드.
        User와 UserDetail을 함께 저장합니다.
        """
        user = super().save(commit=False)

        if commit:
            user.save()
            nickname = self.cleaned_data.get('nickname')
            
            UserDetail.objects.create(
                user=user,
                nickname=nickname
            )
            
        return user