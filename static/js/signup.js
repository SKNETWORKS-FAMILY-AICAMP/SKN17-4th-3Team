// 이메일 중복 확인 코드 + 이메일 인증코드 발급 코드

const emailInput = document.getElementById('id_email');
const checkEmailBtn = document.getElementById('check-email-btn');
const sendCodeBtn = document.getElementById('send-code-btn');
const verifySection = document.getElementById('verify-section');
const verifyInput = document.getElementById('verification_code');
const verifyBtn = document.getElementById('verify-code-btn');
const resendBtn = document.getElementById('resend-code-btn');
const verifyMsg = document.getElementById('verify-message');
const signupBtn = document.getElementById('signup-btn');

let isEmailChecked = false;
let isEmailVerified = false;
let verificationTimer;
let remainingTime = 0;

// 초기 상태: 인증 관련 요소 모두 비활성화
function disableVerificationArea() {
    sendCodeBtn.disabled = true;
    sendCodeBtn.style.backgroundColor = "#E7E7E7";
    resendBtn.style.backgroundColor = "#E7E7E7";
    sendCodeBtn.style.cursor = "not-allowed";
    resendBtn.style.cursor = "not-allowed";
    signupBtn.style.cursor = 'pointer';

    if (verifyInput) verifyInput.disabled = true;
    if (verifyBtn) verifyBtn.disabled = true;
    if (resendBtn) resendBtn.disabled = true;
}
disableVerificationArea();

// 이메일 입력 시 다시 초기화
emailInput.addEventListener('input', () => {
    isEmailChecked = false;
    disableVerificationArea();
});

//이메일 올바른 형식인지 확인하는 코드
document.getElementById('id_email').addEventListener('input', () => {
    const email = document.getElementById('id_email').value;
    const msg = document.getElementById('email-message');
    isEmailChecked = false; 
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (email === '') {
        msg.style.color = 'black';
        msg.textContent = '이메일을 입력하세요.';
        isEmailValidFormat = false;
    } else if (!emailRegex.test(email)) {
        msg.style.color = 'red';
        msg.textContent = '올바른 이메일 형식이 아닙니다.';
        isEmailValidFormat = false;
    } else {
        msg.style.color = 'red';
        msg.textContent = '중복 확인을 해주세요.';
        isEmailValidFormat = true;
    }
});

// 이메일 중복 확인 버튼 클릭
checkEmailBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const msg = document.getElementById('email-message');
    if (!email) {
        msg.style.color = "red";
        msg.textContent = "이메일을 입력하세요.";
        return;
    }

    const response = await fetch(`/uauth/check_email/?email=${email}`);
    const data = await response.json();

    if (data.exists) {
        msg.style.color = "red";
        msg.textContent = "이미 가입되어 있는 이메일입니다.";
        disableVerificationArea();
        isEmailChecked = false;
    } else {
        msg.style.color = "#2600FF";
        msg.textContent = "가입할 수 있는 이메일입니다.";
        isEmailChecked = true;

        // ✅ 인증코드 발급 버튼 활성화 (파란색)
        sendCodeBtn.disabled = false;
        sendCodeBtn.style.backgroundColor = "#D2E0FB";
        sendCodeBtn.style.color = 'black';
        sendCodeBtn.style.cursor = "pointer";
    }
});

// 인증코드 발급 클릭
sendCodeBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    if (!isEmailChecked || !email) return;

    const res = await fetch(`/uauth/send_code/?email=${email}`);
    const data = await res.json();
    alert(data.message);

    // 인증 입력 영역 활성화
    verifyInput.disabled = false;
    verifyBtn.disabled = false;
    resendBtn.disabled = false;
    sendCodeBtn.disabled = true;
    sendCodeBtn.style.cursor = "not-allowed";
    resendBtn.style.cursor = 'pointer';

    verifyInput.style.backgroundColor = "white";
    verifyBtn.style.backgroundColor = "#FEF9D9";
    resendBtn.style.backgroundColor = "#D2E0FB";
    sendCodeBtn.style.backgroundColor = "#E7E7E7";

    // ✅ 여기에 안내 메시지 추가
    verifyMsg.textContent = "5분 안에 인증코드를 정확히 입력해주세요.";
    verifyMsg.style.color = "#333";

    startTimer(300); // 5분
});

// 인증 확인 버튼 클릭
// verifyBtn.addEventListener('click', async () => {
//     const email = emailInput.value.trim();
//     const code = verifyInput.value.trim();

//     if (!code) {
//         verifyMsg.textContent = "시간 내에 인증코드를 정확히 입력해주세요.";
//         verifyMsg.style.color = "red";
//         return;
//     }

//     const res = await fetch(`/uauth/verify_code/?email=${email}&code=${code}`);
//     const data = await res.json();

//     if (data.result === 'success') {
//         verifyMsg.textContent = "인증이 완료되었습니다.";
//         verifyMsg.style.color = "#2600FF";
//         clearInterval(verificationTimer);
//         isEmailVerified = true;

//         // ✅ 입력칸 / 버튼 비활성화
//         verifyInput.disabled = true;
//         verifyInput.style.backgroundColor = '#E7E7E7';
//         verifyInput.style.cursor = 'not-allowed';

//         verifyBtn.disabled = true;
//         verifyBtn.style.backgroundColor = '#E7E7E7';
//         verifyBtn.style.cursor = 'not-allowed';

//         resendBtn.disabled = true;
//         resendBtn.style.backgroundColor = '#E7E7E7';
//         resendBtn.style.cursor = 'not-allowed'; 


//     } else if (data.result === 'timeout') {
//         verifyMsg.textContent = "시간이 초과되었습니다. 인증코드를 재발급 받아주세요.";
//         verifyMsg.style.color = "red";
//     } else {
//         verifyMsg.textContent = "인증코드가 틀렸습니다. 다시 확인해주세요.";
//         verifyMsg.style.color = "red";
//     }
// });
// 인증 확인 버튼 클릭
verifyBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const code = verifyInput.value.trim();

    if (!code) {
        verifyMsg.textContent = "인증코드를 입력해주세요.";
        verifyMsg.style.color = "red";
        return;
    }

    const res = await fetch(`/uauth/verify_code/?email=${email}&code=${code}`);
    const data = await res.json();

    // ✅ 모든 경우 기본값은 false로 시작
    isEmailVerified = false;

    if (data.result === 'success') {
        verifyMsg.textContent = "인증이 완료되었습니다.";
        verifyMsg.style.color = "#2600FF";
        clearInterval(verificationTimer);
        isEmailVerified = true;

        // 입력 및 버튼 비활성화
        verifyInput.disabled = true;
        verifyInput.style.backgroundColor = '#E7E7E7';
        verifyInput.style.cursor = 'not-allowed';

        verifyBtn.disabled = true;
        verifyBtn.style.backgroundColor = '#E7E7E7';
        verifyBtn.style.cursor = 'not-allowed';

        resendBtn.disabled = true;
        resendBtn.style.backgroundColor = '#E7E7E7';
        resendBtn.style.cursor = 'not-allowed'; 

    } else if (data.result === 'timeout') {
        verifyMsg.textContent = "시간이 초과되었습니다. 인증코드를 재발급 받아주세요.";
        verifyMsg.style.color = "red";
        isEmailVerified = false; // ✅ 반드시 false로 유지
    } else {
        verifyMsg.textContent = "인증코드가 틀렸습니다. 다시 확인해주세요.";
        verifyMsg.style.color = "red";
        isEmailVerified = false; // ✅ 틀릴 경우도 false로 유지
    }
});

// 인증코드 재전송 버튼
resendBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    if (!email || !isEmailChecked) {
        verifyMsg.textContent = "먼저 이메일을 입력하고 중복 확인을 완료해주세요.";
        verifyMsg.style.color = "red";
        return;
    }

    // 서버에 인증코드 재전송 요청
    const res = await fetch(`/uauth/send_code/?email=${email}`);
    const data = await res.json();

    // 사용자에게 안내 메시지 표시
    if (data.message) {
        verifyMsg.textContent = "새 인증코드를 이메일로 전송했습니다.";
        verifyMsg.style.color = "#2600FF";
        alert("새 인증코드가 전송되었습니다."); // 선택: 알림창 표시
    } else {
        verifyMsg.textContent = "인증코드 재전송에 실패했습니다. 다시 시도해주세요.";
        verifyMsg.style.color = "red";
    }

    // ✅ 타이머 및 입력칸 초기화
    verifyInput.value = "";           // 기존 인증코드 입력값 초기화
    clearInterval(verificationTimer); // 기존 타이머 중지
    startTimer(300);                  // 새로 5분 타이머 시작

    resendBtn.disabled = true;        // 재전송 직후 잠시 비활성화 (남용 방지)
    resendBtn.style.cursor = "not-allowed";

    setTimeout(() => {
        resendBtn.disabled = false;
        resendBtn.style.cursor = "pointer";
    }, 10000); // 10초 후 다시 활성화
});

// 타이머 표시
function startTimer(seconds) {
    clearInterval(verificationTimer);
    remainingTime = seconds;

    const timerDisplay = document.getElementById('timer');
    verificationTimer = setInterval(() => {
        remainingTime--;
        const min = Math.floor(remainingTime / 60);
        const sec = remainingTime % 60;
        timerDisplay.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
        timerDisplay.style.color = "#333";

        if (remainingTime <= 0) {
            clearInterval(verificationTimer);
            timerDisplay.textContent = "시간 초과";
            timerDisplay.style.color='red';
            resendBtn.disabled = false;
            resendBtn.style.cursor = "pointer";
        }
    }, 1000);
}


let isEmailValidFormat = false;
let isPwValidFormat = false;
let isPwMatch = false;
let isNicknameValid = false;

document.getElementById('id_email').addEventListener('input', () => {
    const email = document.getElementById('id_email').value;
    const msg = document.getElementById('email-message');
    isEmailChecked = false; 
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (email === '') {
        msg.style.color = 'black';
        msg.textContent = '이메일을 입력하세요.';
        isEmailValidFormat = false;
    } else if (!emailRegex.test(email)) {
        msg.style.color = 'red';
        msg.textContent = '올바른 이메일 형식이 아닙니다.';
        isEmailValidFormat = false;
    } else {
        msg.style.color = 'black';
        msg.textContent = '중복 확인을 해주세요.';
        isEmailValidFormat = true;
    }
});


// 비밀번호 체크
document.getElementById('id_password1').addEventListener('input', () => {
    const pw = document.getElementById('id_password1').value;
    const msg = document.getElementById('pw1-message');
    const regex = /^[A-Za-z0-9]{4,15}$/;

    if (pw === ''){
        msg.style.color = 'black';
        msg.textContent = '4~15자 사이의 영어 대/소문자, 숫자를 사용하세요.';
        isPwValidFormat = false;
    } else if (!regex.test(pw)){
        msg.style.color = 'red';
        msg.textContent = '4~15자 사이의 영어 대/소문자, 숫자를 사용하세요.';
        isPwValidFormat = false;
    } else{
        msg.style.color = 'blue';
        msg.textContent = '사용 가능한 비밀번호입니다.';
        isPwValidFormat = true;
    }
    document.getElementById('id_password2').dispatchEvent(new Event('input'));
});

// 비밀번호 확인
document.getElementById('id_password2').addEventListener('input', () => {
    const pw1 = document.getElementById('id_password1').value;
    const pw2 = document.getElementById('id_password2').value;
    const msg = document.getElementById('pw2-message');

    if (pw2 === ''){
        msg.textContent = '';
        isPwMatch = false;
    } else if (pw1 === pw2 && isPwValidFormat){
        msg.style.color = 'blue';
        msg.textContent = '비밀번호가 일치합니다.';
        isPwMatch = true;
    } else if (pw1 === pw2 && !isPwValidFormat){
        msg.style.color = 'red';
        msg.textContent = '4~15자 사이의 영어 대/소문자, 숫자를 사용하세요.';
        isPwMatch = false;
    }
    else{
        msg.style.color = 'red';
        msg.textContent = '비밀번호가 일치하지 않습니다.';
        isPwMatch = false;
    }
});

// 닉네임 체크
document.getElementById('id_nickname').addEventListener('input', () => {
    const nick = document.getElementById('id_nickname').value;
    const msg = document.getElementById('nickname-message');
    const regex = /^[A-Za-z가-힣]{2,10}$/;

    if (nick === ''){
        msg.style.color = 'black';
        msg.textContent = '2~10자 사이의 한국어, 영어만 사용 가능합니다.';
        isNicknameValid = false;
    } else if (!regex.test(nick)){
        msg.style.color = 'red';
        msg.textContent = '2~10자 사이의 한국어, 영어만 사용 가능합니다.';
        isNicknameValid = false;
    } else{
        msg.style.color = 'blue';
        msg.textContent = '사용 가능한 닉네임입니다.';
        isNicknameValid = true;
    }
});

function validateEmail(){
    const email = document.getElementById('id_email').value.trim();
    const msg = document.getElementById('email-message');
    return email !== '' && msg.style.color === 'blue';
}

function validatePassword(){
    const pw = document.getElementById('id_password1').value;
    const regex = /^[A-Za-z0-9]{4,15}$/;
    return regex.test(pw);
}

function validatePasswordMatch(){
    const pw1 = document.getElementById('id_password1').value;
    const pw2 = document.getElementById('id_password2').value;
    return pw1 !== '' && pw1 == pw2;
}

function validateNickname(){
    const nick = document.getElementById('id_nickname').value;
    const regex = /^[A-Za-z가-힣]{2,10}$/;
    return regex.test(nick);
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("✅ signup.js loaded");

  // ============================================
  // 미피 기존 코드 전체를 여기에 그대로 넣어
  // ============================================

  // ✅ CSRF 토큰 가져오기 함수 추가
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');

  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formError = document.getElementById('js-form-error');
    formError.textContent = '';

    const isEmailFinal = isEmailChecked;
    const isPwFinal = isPwValidFormat && isPwMatch;
    const isNickFinal = isNicknameValid;

    if (!isEmailVerified) {
      formError.textContent = '이메일 인증을 완료해주세요.';
      verifyMsg.style.color = 'red';
      verifyMsg.textContent = '이메일 인증을 완료해야 회원가입이 가능합니다.';
      return;
    }

    if (!isEmailFinal || !isPwFinal || !isNickFinal) {
      formError.textContent = '모든 정보를 입력해주세요.';
      if (!isEmailChecked) {
        document.getElementById('email-message').style.color = 'red';
        document.getElementById('email-message').textContent = '이메일 중복 확인을 완료해주세요.';
      }
      return;
    }

    // ✅ 회원가입 요청 전송
    try {
      const form = e.target;
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'X-CSRFToken': csrftoken },
        body: new FormData(form),
      });

      if (response.ok) {
        const modal = document.getElementById('successModal');
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      } else {
        const data = await response.json();
        console.error(data);
        formError.textContent = '회원가입 중 오류가 발생했습니다.';
      }
    } catch (error) {
      console.error(error);
      formError.textContent = '서버와 연결할 수 없습니다.';
    }
  });
});

