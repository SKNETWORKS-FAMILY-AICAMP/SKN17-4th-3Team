const emailInput = document.getElementById("email");
const sendCodeBtn = document.getElementById("sendCodeBtn");
const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendBtn");
const codeInput = document.getElementById("code");
const newPwInput = document.getElementById("newPw");
const confirmPwInput = document.getElementById("confirmPw");
const completeBtn = document.getElementById("completeBtn");

let isEmailChecked = false;
let isEmailVerified = false;
let verificationTimer;
let remainingTime = 0;

// 초기 상태: 인증 관련 요소 모두 비활성화
function disableVerificationArea() {
    resendBtn.style.backgroundColor = "#E7E7E7";
    verifyBtn.style.backgroundColor = "#E7E7E7";
    verifyInput.style.backgroundColor = '#E7E7E7';
    resendBtn.style.cursor = "not-allowed";
    verifyBtn.style.cursor = 'not-allowed';
    sendCodeBtn.style.cursor = 'pointer';

    if (verifyInput) verifyInput.disabled = true;
    if (verifyBtn) verifyBtn.disabled = true;
    if (resendBtn) resendBtn.disabled = true;
}
disableVerificationArea();

//이메일 올바른 형식인지 확인하는 코드
document.getElementById('email').addEventListener('input', () => {
    const email = emailInput.value;
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
    } else if (
        
    )
});

// 인증코드 발급 클릭
sendCodeBtn.addEventListener('click', async () => {
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
        resendBtn.disabled=false;
        sendCodeBtn.style.backgroundColor = "#D2E0FB";
        sendCodeBtn.style.color = 'black';
        sendCodeBtn.style.cursor = "pointer";
    }
    startTimer(300); // 5분
});

// 인증 확인 버튼 클릭
verifyBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const code = verifyInput.value.trim();

    if (!code) {
        verifyMsg.textContent = "시간 내에 인증코드를 정확히 입력해주세요.";
        verifyMsg.style.color = "red";
        return;
    }

    const res = await fetch(`/uauth/verify_code/?email=${email}&code=${code}`);
    const data = await res.json();

    if (data.result === 'success') {
        verifyMsg.textContent = "인증이 완료되었습니다.";
        verifyMsg.style.color = "#2600FF";
        clearInterval(verificationTimer);
        isEmailVerified = true;

        // ✅ 입력칸 / 버튼 비활성화
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
    } else {
        verifyMsg.textContent = "인증코드가 틀렸습니다. 다시 확인해주세요.";
        verifyMsg.style.color = "red";
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

document.addEventListener("DOMContentLoaded", () => {

  // 완료 버튼 위 메시지 표시용 요소 생성
  const completeMsg = document.createElement("p");
  completeMsg.style.fontSize = "13px";
  completeMsg.style.marginTop = "8px";
  completeMsg.style.color = "red";
  completeBtn.parentNode.insertBefore(completeMsg, completeBtn);

  // 완료 버튼 클릭 이벤트
  completeBtn.addEventListener("click", () => {
    const pw = newPwInput.value.trim();
    const confirmPw = confirmPwInput.value.trim();
    const modal = document.getElementById("modal");

    // 이메일 인증 완료 여부 검사
    if (!freezeMessage || messageContainer.textContent !== "인증이 완료되었습니다.") {
      completeMsg.textContent = "이메일 인증을 진행해주세요.";
      return;
    }

    // 입력값 누락 검사
    if (pw === "" || confirmPw === "") {
      completeMsg.textContent = "모든 정보를 입력해주세요.";
      return;
    }
    
    // 비밀번호 형식 검사
    if (!validatePassword(pw)) {
    completeMsg.textContent = "비밀번호 형식을 확인해주세요.";
    completeMsg.style.color = "red";
    return;
    }

    // 비밀번호 일치 검사
    if (pw !== confirmPw) {
    completeMsg.textContent = "비밀번호가 일치하지 않습니다.";
    completeMsg.style.color = "red";
    return;
    }

    // 모든 조건 충족 시 — modal.html
    if (modal) {
        modal.classList.remove("hidden"); 
    }

    // 닫기 버튼 클릭 시 모달 숨기기
    closeBtn.addEventListener("click", () => {
    const redirectUrl = closeBtn.getAttribute("data-url"); // data-url에서 URL 가져오기
    window.location.href = redirectUrl; // 해당 URL로 이동
    });
  });
});