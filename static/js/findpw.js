const emailInput = document.getElementById("email");
const sendCodeBtn = document.getElementById("sendCodeBtn");
const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendBtn");
const codeInput = document.getElementById("code");
const newPwInput = document.getElementById("newPw");
const confirmPwInput = document.getElementById("confirmPw");
const completeBtn = document.getElementById("completeBtn");

const emailMsg = document.getElementById("email-message");
const verifyMsg = document.getElementById("verify-message");

let isEmailChecked = false;
let isEmailVerified = false;
let verificationTimer;
let remainingTime = 0;
let prevEmailValue = "";  

// ✅ 초기 상태: 인증 관련 요소 비활성화
function disableVerificationArea() {
    resendBtn.style.backgroundColor = "#E7E7E7";
    verifyBtn.style.backgroundColor = "#E7E7E7";
    codeInput.style.backgroundColor = "#E7E7E7";

    resendBtn.style.cursor = "not-allowed";
    verifyBtn.style.cursor = "not-allowed";
    codeInput.style.cursor = "not-allowed";

    resendBtn.disabled = true;
    verifyBtn.disabled = true;
    codeInput.disabled = true;
}
disableVerificationArea();


// ✅ 이메일 형식 검사
emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailMsg.style.color = "black";
        emailMsg.textContent = "이메일을 입력하세요.";
    } else if (!emailRegex.test(email)) {
        emailMsg.style.color = "red";
        emailMsg.textContent = "올바른 이메일 형식이 아닙니다.";
    } else {
        emailMsg.textContent = "";
    }
});

emailInput.addEventListener("input", () => {
    const currentEmail = emailInput.value.trim();

    // 이메일이 이전 값과 다를 경우, 인증 상태 리셋
    if (currentEmail !== prevEmailValue) {
        disableVerificationArea(); 
        isEmailVerified = false; 
        isEmailChecked = false;

        codeInput.value ="";
        verifyMsg.textContent = "";
         // ✅ 타이머 초기화
        const timerEl = document.getElementById("timer");
        if (timerEl) timerEl.textContent = "";

        // ✅ 인증코드 발급 버튼 다시 활성화
        sendCodeBtn.disabled = false;
        sendCodeBtn.style.backgroundColor = "#fff9cf";
        sendCodeBtn.style.cursor = "pointer";
        clearInterval(verificationTimer);
    }
    prevEmailValue = currentEmail; // 현재 이메일 저장
});



// ✅ 인증코드 발급 버튼 클릭
sendCodeBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // 폼 submit 방지
    const email = emailInput.value.trim();

    if (!email) {
        emailMsg.style.color = "red";
        emailMsg.textContent = "이메일을 입력하세요.";
        return;
    }

    try {
        const response = await fetch(`/uauth/check_email/?email=${email}`, {
            method: "GET",
            cache: "no-cache",
        });
        const data = await response.json();

        if (data.exists) {
            const res = await fetch(`/uauth/send_code/?email=${email}`);
            alert("해당 이메일로 인증코드를 발급했습니다.");
            isEmailChecked = true;

            // 인증 관련 요소 활성화
            resendBtn.disabled = false;
            resendBtn.style.backgroundColor = "#fff9cf";
            resendBtn.style.cursor = "pointer";

            verifyBtn.disabled = false;
            verifyBtn.style.backgroundColor = "#fff9cf";
            verifyBtn.style.cursor = "pointer";

            codeInput.disabled = false;
            codeInput.style.backgroundColor = "#fff";
            codeInput.style.cursor = "text";

            sendCodeBtn.disabled = true;
            sendCodeBtn.style.backgroundColor = "#E7E7E7";
            sendCodeBtn.style.cursor = "not-allowed";
            // 타이머 시작
            startTimer(300);
        } else {
            // 존재하지 않는 이메일
            emailMsg.style.color = "red";
            emailMsg.textContent = "가입 이력이 없는 이메일입니다. 이메일을 확인해주세요.";
            disableVerificationArea();
            isEmailChecked = false;
        }
    } catch (error) {
        console.error("인증코드 요청 실패:", error);
        emailMsg.style.color = "red";
        emailMsg.textContent = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
});


// ✅ 인증 확인 버튼 클릭
verifyBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const code = codeInput.value.trim();

    if (!code) {
        verifyMsg.textContent = "인증코드를 입력해주세요.";
        verifyMsg.style.color = "red";
        return;
    }

    try {
        const res = await fetch(`/uauth/verify_code/?email=${email}&code=${code}`, {
            method: "GET",
            cache: "no-cache",
        });
        const data = await res.json();

        if (data.result === "success") {
            verifyMsg.textContent = "인증이 완료되었습니다.";
            verifyMsg.style.color = "#2600FF";
            clearInterval(verificationTimer);
            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.textContent = "";
            isEmailVerified = true;

            // 입력칸 / 버튼 비활성화
            codeInput.disabled = true;
            codeInput.style.backgroundColor = "#E7E7E7";
            codeInput.style.cursor = "not-allowed";

            verifyBtn.disabled = true;
            verifyBtn.style.backgroundColor = "#E7E7E7";
            verifyBtn.style.cursor = "not-allowed";

            resendBtn.disabled = true;
            resendBtn.style.backgroundColor = "#E7E7E7";
            resendBtn.style.cursor = "not-allowed";

        } else if (data.result === "timeout") {
            verifyMsg.textContent = "시간이 초과되었습니다. 인증코드를 재발급 받아주세요.";
            verifyMsg.style.color = "red";
        } else {
            verifyMsg.textContent = "인증코드가 틀렸습니다. 다시 확인해주세요.";
            verifyMsg.style.color = "red";
        }
    } catch (error) {
        console.error("인증 확인 실패:", error);
        verifyMsg.textContent = "서버 오류가 발생했습니다.";
        verifyMsg.style.color = "red";
    }
});


// ✅ 인증코드 재전송 버튼 클릭
resendBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !isEmailChecked) {
        verifyMsg.textContent = "먼저 이메일을 입력하고 인증코드를 발급받으세요.";
        verifyMsg.style.color = "red";
        return;
    }

    try {
        const res = await fetch(`/uauth/send_code/?email=${email}`, {
            method: "GET",
            cache: "no-cache",
        });
        const data = await res.json();

        if (data.message) {
            verifyMsg.textContent = "";
            verifyMsg.style.color = "#2600FF";
            alert("새 인증코드가 전송되었습니다.");
        } else {
            verifyMsg.textContent = "인증코드 재전송에 실패했습니다.";
            verifyMsg.style.color = "red";
        }

        // 타이머 재시작
        codeInput.value = "";
        clearInterval(verificationTimer);
        startTimer(300);
        setTimeout(() => {
            resendBtn.disabled = false;
            resendBtn.style.cursor = "pointer";
        }, 10000);
    } catch (error) {
        console.error("재전송 실패:", error);
        verifyMsg.textContent = "서버 오류가 발생했습니다.";
        verifyMsg.style.color = "red";
    }
});


// ✅ 타이머 표시
function startTimer(seconds) {
    clearInterval(verificationTimer);
    remainingTime = seconds;

    const timerDisplay = document.getElementById("timer");
    if (!timerDisplay) {
        // 타이머가 HTML에 없으면 만들어줌
        const span = document.createElement("span");
        span.id = "timer";
        span.className = "guide-text";
        codeInput.parentNode.appendChild(span);
    }

    const timerEl = document.getElementById("timer");

    verificationTimer = setInterval(() => {
        remainingTime--;
        const min = Math.floor(remainingTime / 60);
        const sec = remainingTime % 60;
        timerEl.textContent = `5분 안에 인증코드를 입력해주세요. ${min}:${sec.toString().padStart(2, "0")}`;
        timerEl.style.color = "#333";

        if (remainingTime <= 0) {
            clearInterval(verificationTimer);
            timerEl.textContent = "시간 초과";
            timerEl.style.color = "red";
            resendBtn.disabled = false;
            resendBtn.style.cursor = "pointer";
        }
    }, 1000);
}


// 비밀번호 체크
document.getElementById('newPw').addEventListener('input', () => {
    const pw = document.getElementById('newPw').value;
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
    document.getElementById('confirmPw').dispatchEvent(new Event('input'));
});

// 비밀번호 확인
document.getElementById('confirmPw').addEventListener('input', () => {
    const pw1 = document.getElementById('newPw').value;
    const pw2 = document.getElementById('confirmPw').value;
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



completeBtn.addEventListener("click", () => {
    const pw = newPwInput.value.trim();
    const confirmPw = confirmPwInput.value.trim();
    const email = emailInput.value.trim();

    if (!isEmailVerified) {
        completeMsg.textContent = "이메일 인증을 완료해주세요.";
        return;
    }

    if (pw === "" || confirmPw === "") {
        completeMsg.textContent = "모든 정보를 입력해주세요.";
        return;
    }

    if (!validatePassword(pw)) {
        completeMsg.textContent = "비밀번호 형식을 확인해주세요.";
        return;
    }

    if (pw !== confirmPw) {
        completeMsg.textContent = "비밀번호가 일치하지 않습니다.";
        return;
    }

    // ✅ 모든 조건 통과 시 비밀번호 변경 요청
    fetch("/uauth/modify_pw/", {   // ← Django의 URL 이름과 일치시킴
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
            email: email,
            new_password: pw,
            confirm_password: confirmPw,  // ← views.py에서 이 값도 비교함
        }),
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // ✅ 변경 성공 → 모달 열기
            const modal = document.getElementById("successModal");
            modal.classList.remove("hidden");

            const closeModalBtn = document.getElementById("closeModalBtn");
            closeModalBtn.addEventListener("click", () => {
                modal.classList.add("hidden");
                window.location.href = "/uauth/";
            });
        } else {
            completeMsg.textContent = data.message || "비밀번호 변경에 실패했습니다.";
        }
    })
    .catch(error => {
        console.error("비밀번호 변경 요청 실패:", error);
        completeMsg.textContent = "서버 오류가 발생했습니다.";
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


// ✅ 비밀번호 형식 검사 함수
function validatePassword(password) {
    const regex = /^[A-Za-z0-9]{4,15}$/;
    return regex.test(password);
}
