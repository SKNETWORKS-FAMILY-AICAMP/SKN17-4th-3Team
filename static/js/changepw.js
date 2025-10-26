// ✅ 폼 자동 전송 방지
document.getElementById("changePwForm").addEventListener("submit", (e) => e.preventDefault());

// ✅ 요소 가져오기
const changeBtn = document.getElementById("submitBtn");
const currentPwInput = document.getElementById("current_password");
const newPwInput = document.getElementById("new_password");
const confPwInput = document.getElementById("confirm_password");

const currentPwError = document.getElementById("current_password_error");
const confirmPwMsg = document.getElementById("confirm_password_message");
const errorMsg = document.getElementById("error-message");

// ✅ 비밀번호 일치 여부 실시간 확인
confPwInput.addEventListener("input", () => {
  const newPw = newPwInput.value.trim();
  const confPw = confPwInput.value.trim();

  if (confPw === "") {
    confirmPwMsg.textContent = "";
    return;
  }

  if (newPw === confPw) {
    confirmPwMsg.textContent = "비밀번호가 일치합니다.";
    confirmPwMsg.style.color = "#2600FF"; // 파란색
  } else {
    confirmPwMsg.textContent = "비밀번호가 일치하지 않습니다.";
    confirmPwMsg.style.color = "red"; // 빨간색
  }
});

// ✅ 비밀번호 유효성 검사 함수
function validatePassword(pw) {
  const regex = /^[A-Za-z0-9]{4,15}$/;
  return regex.test(pw);
}

// ✅ 새 비밀번호 입력 시 실시간 검사

newPwInput.addEventListener("input", () => {
  const newPwMsg = document.getElementById("new_password_message");
  const pw = newPwInput.value.trim();

  if (pw === "") {
    newPwMsg.textContent = "4~15자 사이의 영어 대/소문자, 숫자만을 사용하세요.";
    newPwMsg.style.color = "#333"; // 원래 색상 (기본 안내)
    return;
  }

 if (!validatePassword(pw)) {
  newPwMsg.style.color = "red";
} else {
  newPwMsg.textContent = "비밀번호 형식이 올바릅니다.";
  newPwMsg.style.color = "#2600FF";
}
});

// ✅ 변경 버튼 클릭 시
changeBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("🔹 버튼 클릭됨"); // 디버깅용

  const oldPw = currentPwInput.value.trim();
  const newPw = newPwInput.value.trim();
  const confPw = confPwInput.value.trim();

  // 초기화
  currentPwError.textContent = "";

  if (!oldPw || !newPw || !confPw) {
    errorMsg.textContent = "모든 정보를 입력해주세요";
    errorMsg.style.color = 'red';
    return;
  }
  // ✅ 기존 비밀번호와 새 비밀번호가 동일한 경우
  if (oldPw === newPw) {
    errorMsg.textContent = "기존 비밀번호와 동일합니다.";
    currentPwError.style.color = "red";
    return;
  }

  try {
    const res = await fetch("/chat/change_pw/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        oldPw: oldPw,
        newPw: newPw,
        confPw: confPw,
      }),
    });

    const data = await res.json();
    console.log("서버 응답:", data);

    // ✅ 기존 비밀번호 틀림
    if (data.result === "wrong_old_pw") {
      currentPwError.textContent = "잘못된 비밀번호입니다.";
      currentPwError.style.color = "red";
      return;
    }

    // ✅ 새 비밀번호 불일치
    if (data.result === "mismatch") {
      confirmPwMsg.textContent = "비밀번호가 일치하지 않습니다.";
      confirmPwMsg.style.color = "red";
      return;
    }

    // ✅ 성공
    if (data.result === "success") {
  // ✅ 모달 표시
  const modal = document.getElementById("pwChangeCompleteModal");
  modal.classList.remove("hidden");

  // ✅ 닫기 버튼 클릭 시 이동
  const closeBtn = document.getElementById("pwChangeCloseBtn");
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.location.href = "/chat/"; // 로그인 유지 상태로 이동
  });
}

  } catch (error) {
    console.error("에러 발생:", error);
  }
});

// ✅ CSRF 토큰 가져오기
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
