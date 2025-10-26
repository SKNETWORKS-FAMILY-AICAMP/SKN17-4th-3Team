// changepw.js
const oldPwInput = document.getElementById("oldPw");
const newPwInput = document.getElementById("newPw");
const confirmPwInput = document.getElementById("confirmPw");
const completeBtn = document.getElementById("completeBtn");

const oldPwMsg = document.getElementById("oldpw-message");
const newPwMsg = document.getElementById("pw1-message");
const confirmPwMsg = document.getElementById("pw2-message");
const completeMsg = document.getElementById("complete-message");

const modal = document.getElementById("changepw-modal");
const modalCloseBtn = document.getElementById("pwChangeCloseBtn");

let isOldPwValid = false;
let isNewPwValid = false;
let isPwMatch = false;

function getCSRFTokenFromForm() {
  const el = document.querySelector("input[name=csrfmiddlewaretoken]");
  return el ? el.value : "";
}

// 기존 비밀번호 확인 (blur 시)
oldPwInput.addEventListener("blur", async () => {
  const oldPw = oldPwInput.value.trim();
  if (!oldPw) {
    oldPwMsg.textContent = "기존 비밀번호를 입력하세요.";
    oldPwMsg.style.color = "red";
    isOldPwValid = false;
    return;
  }

  try {
    const res = await fetch(`/chat/check_old_password/?old_pw=${encodeURIComponent(oldPw)}`);
    const data = await res.json();
    if (data.result === "success") {
      isOldPwValid = true;
    } else {
      isOldPwValid = false;
    }
  } catch (e) {
    console.error(e);
    oldPwMsg.textContent = "서버 오류가 발생했습니다.";
    oldPwMsg.style.color = "red";
    isOldPwValid = false;
  }
});

// 새 비밀번호 유효성
newPwInput.addEventListener("input", () => {
  const pw = newPwInput.value;
  const regex = /^[A-Za-z0-9]{4,15}$/;
  if (!pw) {
    newPwMsg.textContent = "4~15자 사이의 영어 대/소문자, 숫자를 사용하세요.";
    newPwMsg.style.color = "black";
    isNewPwValid = false;
  } else if (!regex.test(pw)) {
    newPwMsg.textContent = "형식이 올바르지 않습니다.";
    newPwMsg.style.color = "red";
    isNewPwValid = false;
  } else {
    newPwMsg.textContent = "사용 가능한 비밀번호입니다.";
    newPwMsg.style.color = "#2600FF";
    isNewPwValid = true;
  }

  // ✅ 기존 비밀번호와 동일한지 확인
  if (pw && oldPw && pw === oldPw) {
    newPwMsg.textContent = "기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.";
    newPwMsg.style.color = "red";
    isNewPwValid = false;
    return; // 🚫 더 이상 검사하지 않음
  }
  confirmPwInput.dispatchEvent(new Event("input"));
});

// 새 비밀번호 일치
confirmPwInput.addEventListener("input", () => {
  const pw1 = newPwInput.value;
  const pw2 = confirmPwInput.value;
  if (!pw2) {
    confirmPwMsg.textContent = "";
    isPwMatch = false;
  } else if (pw1 === pw2 && isNewPwValid) {
    confirmPwMsg.textContent = "비밀번호가 일치합니다.";
    confirmPwMsg.style.color = "#2600FF";
    isPwMatch = true;
  } else if (pw1 === pw2 && !isNewPwValid) {
    confirmPwMsg.textContent = "형식이 올바르지 않습니다.";
    confirmPwMsg.style.color = "red";
    isPwMatch = false;
  } else {
    confirmPwMsg.textContent = "비밀번호가 일치하지 않습니다.";
    confirmPwMsg.style.color = "red";
    isPwMatch = false;
  }
});

// 완료 버튼 → POST
completeBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  completeMsg.textContent = "";

  if (!isOldPwValid) { completeMsg.textContent = "기존 비밀번호를 정확히 입력해주세요."; completeMsg.style.color = "red"; return; }
  if (!isNewPwValid) { completeMsg.textContent = "새 비밀번호 형식이 올바르지 않습니다."; completeMsg.style.color = "red"; return; }
  if (!isPwMatch)   { completeMsg.textContent = "새 비밀번호가 일치하지 않습니다."; completeMsg.style.color = "red"; return; }
   // ✅ 기존 비밀번호와 동일한지 확인

  try {
    const res = await fetch("/chat/change_pw/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFTokenFromForm(),
      },
      body: JSON.stringify({
        old_password: oldPwInput.value,
        new_password1: newPwInput.value,
        new_password2: confirmPwInput.value,
      }),
    });

    const data = await res.json();
    if (data.result === "success") {

      modal.classList.remove("hidden");
      modal.style.display = "flex";

    } else {
      completeMsg.textContent = data.message || "비밀번호 변경에 실패했습니다.";
      completeMsg.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    completeMsg.textContent = "서버 연결 중 오류가 발생했습니다.";
    completeMsg.style.color = "red";
  }
});
// ✅ 모달 닫기 버튼 이벤트
modalCloseBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.style.display = "none";
  window.location.href = "/chat/";
});