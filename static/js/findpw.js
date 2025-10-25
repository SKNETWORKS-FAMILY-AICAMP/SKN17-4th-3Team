document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const sendCodeBtn = document.getElementById("sendCodeBtn");
  const verifyBtn = document.getElementById("verifyBtn");
  const resendBtn = document.getElementById("resendBtn");
  const codeInput = document.getElementById("code");
  const newPwInput = document.getElementById("newPw");
  const confirmPwInput = document.getElementById("confirmPw");

  // 새 비밀번호 입력란 비활성화 (인증 완료 전까지)
  newPwInput.disabled = true;
  confirmPwInput.disabled = true;
  newPwInput.style.backgroundColor = "#f5f5f5";
  confirmPwInput.style.backgroundColor = "#f5f5f5";
  newPwInput.style.cursor = "not-allowed";
  confirmPwInput.style.cursor = "not-allowed";

  // 메시지 요소 생성
  const emailMsg = document.createElement("p");
  const messageContainer = document.createElement("p");
  const pwRuleMsg = document.createElement("p");
  const pwMatchMsg = document.createElement("p");

  emailMsg.style.cssText = "font-size:13px;margin-top:6px;";
  messageContainer.style.cssText = "font-size:13px;margin-top:6px;color:#333;";
  pwRuleMsg.style.cssText = "font-size:13px;margin-top:6px;color:#333;";
  pwMatchMsg.style.cssText = "font-size:13px;margin-top:6px;color:#333;";

  document.querySelector(".email-row .input-box").appendChild(emailMsg);
  document.querySelector(".code-row .input-box").appendChild(messageContainer);
  document.querySelector(".newpw-row .input-box").appendChild(pwRuleMsg);
  document.querySelector(".confirmpw-row .input-box").appendChild(pwMatchMsg);

  emailInput.insertAdjacentElement("afterend", emailMsg);
  codeInput.insertAdjacentElement("afterend", messageContainer);
  newPwInput.parentNode.appendChild(pwRuleMsg);
  confirmPwInput.parentNode.appendChild(pwMatchMsg);

  let timer = null;
  let remainingTime = 300;
  let codeSent = false;
  let freezeMessage = false;
  let wrongAttempt = false;
  const correctCode = "123456";
  const allowedEmail = "jennyuu0429@naver.com";
  setButtonState(false); // 페이지 로드 시 인증확인/재전송 버튼 비활성화
  setSendButtonState(true); // 인증코드 발급 버튼은 기본 활성화 상태 유지

  // 버튼 활성화/비활성화
  function setButtonState(active) {
    [verifyBtn, resendBtn].forEach(btn => {
      btn.disabled = !active;
      btn.style.backgroundColor = active ? "#fff9cf" : "#f1f1f1";
      btn.style.border = active ? "1.5px solid #d6c784" : "1.5px solid #aaa";
      btn.style.cursor = active ? "pointer" : "not-allowed";
    });
  }

  function setSendButtonState(active) {
    sendCodeBtn.disabled = !active;
    sendCodeBtn.style.backgroundColor = active ? "#fff9cf" : "#f1f1f1";
    sendCodeBtn.style.border = active ? "1.5px solid #d6c784" : "1.5px solid #aaa";
    sendCodeBtn.style.cursor = active ? "pointer" : "not-allowed";
  }

  // 시간 포맷
  const formatTime = sec => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;

  // 메시지 업데이트
  function updateMessage() {
    if (!freezeMessage) {
      if (wrongAttempt) {
        messageContainer.innerHTML = `<span style="color:red;">인증코드가 틀렸습니다. 다시 확인해주세요.</span> 남은 시간 ${formatTime(remainingTime)}`;
      } else {
        messageContainer.textContent = `5분 안에 인증코드를 입력해주세요. 남은 시간 ${formatTime(remainingTime)}`;
      }
    }
  }

  // 타이머 시작
  function startTimer() {
    clearInterval(timer);
    remainingTime = 300;
    codeSent = true;
    freezeMessage = false;
    wrongAttempt = false;
    updateMessage();

    timer = setInterval(() => {
      remainingTime--;
      if (remainingTime <= 0) {
        clearInterval(timer);
        messageContainer.textContent = "인증시간이 만료되었습니다.";
        messageContainer.style.color = "red";
        codeSent = false;
        setButtonState(false);
      } else {
        updateMessage();
      }
    }, 1000);
  }

  // 이메일 검사
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{3,}$/;
    
    if (email === "") {
      emailMsg.textContent = "";
      setSendButtonState(false);
      return;
    }
  // 이메일 형식 검사
    if (!pattern.test(email)) {
        emailMsg.textContent = "정확한 이메일 형식으로 입력해주세요.";
        emailMsg.style.color = "red";
        setSendButtonState(false);
        return;
    }
    if (email === allowedEmail) {
      emailMsg.textContent = "가입할 수 있는 이메일입니다.";
      emailMsg.style.color = "blue";
      setSendButtonState(true);
    } else {
      emailMsg.textContent = "이미 가입되어있는 이메일입니다.";
      emailMsg.style.color = "red";
      setSendButtonState(false);
    }
  });

  // 인증코드 발급
  sendCodeBtn.addEventListener("click", () => {
    alert("인증코드가 발급되었습니다! (테스트용 코드: 123456)");
    startTimer();
    setButtonState(true);
  });

  // 인증 확인
  verifyBtn.addEventListener("click", () => {
    if (!codeSent) {
      messageContainer.textContent = "먼저 인증코드를 발급받으세요.";
      messageContainer.style.color = "red";
      return;
    }
    if (remainingTime <= 0) {
      messageContainer.textContent = "인증시간이 만료되었습니다.";
      messageContainer.style.color = "red";
      setButtonState(false);
      return;
    }

    const enteredCode = codeInput.value.trim();
    if (enteredCode === correctCode) {
      clearInterval(timer);
      freezeMessage = true;
      wrongAttempt = false;
      messageContainer.textContent = "인증이 완료되었습니다.";
      messageContainer.style.color = "blue";
      setButtonState(false);
      newPwInput.disabled = false;
      confirmPwInput.disabled = false;
      newPwInput.style.backgroundColor = "#ffffff";
      confirmPwInput.style.backgroundColor = "#ffffff";
      newPwInput.style.cursor = "text";
      confirmPwInput.style.cursor = "text";
    } else {
      wrongAttempt = true;
      freezeMessage = false;
      updateMessage();
    }
  });

  // 재전송
  resendBtn.addEventListener("click", () => {
    alert("인증코드가 재전송되었습니다! (테스트용 코드: 123456)");
    startTimer();
  });

  // 비밀번호 정규식 검사
  function validatePassword(pw) {
    const pattern = /^[A-Za-z0-9]{4,15}$/;
    return pattern.test(pw);
  }

  // 새 비밀번호 입력 시
  newPwInput.addEventListener("input", () => {
    if (validatePassword(newPwInput.value)) {
      pwRuleMsg.style.color = "#333";
      pwRuleMsg.textContent = "4~15자의 영어 대/소문자, 숫자를 사용하세요.";
    } else {
      pwRuleMsg.style.color = "red";
      pwRuleMsg.textContent = "4~15자의 영어 대/소문자, 숫자를 사용하세요.";
    }
    checkPasswordMatch();
  });

  // 비밀번호 일치 확인
  confirmPwInput.addEventListener("input", checkPasswordMatch);
  function checkPasswordMatch() {
    const pw = newPwInput.value;
    const confirmPw = confirmPwInput.value;
    if (confirmPw === "") {
      pwMatchMsg.textContent = "";
      return;
    }
    if (pw === confirmPw) {
      pwMatchMsg.textContent = "비밀번호가 일치합니다.";
      pwMatchMsg.style.color = "blue";
    } else {
      pwMatchMsg.textContent = "비밀번호가 일치하지 않습니다.";
      pwMatchMsg.style.color = "red";
    }
  }

    const completeBtn = document.getElementById("completeBtn");

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