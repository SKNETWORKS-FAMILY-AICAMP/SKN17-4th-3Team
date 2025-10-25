(() => {
  // 모달로 AJAX 삽입된 뒤 실행되므로 DOMContentLoaded 사용하지 않음
  const form = document.getElementById("changePwForm");
  if (!form) return;

  const currentPw = document.getElementById("current_password"); // name=old_password
  const newPw = document.getElementById("new_password");         // name=new_password1
  const confirmPw = document.getElementById("confirm_password"); // name=new_password2

  const currentMsg = document.getElementById("current_password_error");
  const newPwMsg = document.getElementById("new_password_message");
  const confirmPwMsg = document.getElementById("confirm_password_message");

  if (newPwMsg) {
    newPwMsg.textContent = "4~15자 사이의 영어 대/소문자, 숫자를 사용하세요.";
    newPwMsg.style.color = "black";
  }

  function validatePassword(pw) {
    return /^[A-Za-z0-9]{4,15}$/.test(pw);
  }

  newPw.addEventListener("input", () => {
    const pw = newPw.value.trim();
    if (pw === "") {
      newPwMsg.textContent = "4~15자 사이의 영어 대/소문자, 숫자를 사용하세요.";
      newPwMsg.style.color = "black";
      return;
    }
    if (!validatePassword(pw)) {
      newPwMsg.textContent = "4~15자 사이의 영어 대/소문자, 숫자를 사용하세요.";
      newPwMsg.style.color = "red";
    } else {
      newPwMsg.textContent = "사용 가능한 비밀번호입니다.";
      newPwMsg.style.color = "#2600FF"; // 회원가입 UX와 통일
    }
    checkPasswordMatch();
  });

  confirmPw.addEventListener("input", checkPasswordMatch);
  function checkPasswordMatch() {
    const pw = newPw.value.trim();
    const confirm = confirmPw.value.trim();
    if (confirm === "") {
      confirmPwMsg.textContent = "";
      return;
    }
    if (pw === confirm) {
      confirmPwMsg.textContent = "비밀번호가 일치합니다.";
      confirmPwMsg.style.color = "#2600FF";
    } else {
      confirmPwMsg.textContent = "비밀번호가 일치하지 않습니다.";
      confirmPwMsg.style.color = "red";
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
    const formData = new FormData(form);

    const old = currentPw.value.trim();
    const pw = newPw.value.trim();
    const confirm = confirmPw.value.trim();

    if (!old || !pw || !confirm) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    if (!validatePassword(pw)) {
      newPwMsg.textContent = "비밀번호 형식을 확인해주세요.";
      newPwMsg.style.color = "red";
      return;
    }
    if (pw !== confirm) {
      confirmPwMsg.textContent = "비밀번호가 일치하지 않습니다.";
      confirmPwMsg.style.color = "red";
      return;
    }

    try {
      const res = await fetch("/chat/change_password/", {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        // 비밀번호 변경 성공 → 변경 모달 닫고 완료 모달 열기
        document.getElementById("changePwModal").style.display = "none";
        const successModal = document.getElementById("pwChangeCompleteModal");
        if (successModal) {
            successModal.classList.remove("hidden");
            successModal.style.display = "flex";
        }

        const closeBtn = document.getElementById("closeBtn");
        if (closeBtn && !closeBtn.dataset.bound) {
          closeBtn.addEventListener("click", () => {
            const redirectUrl = closeBtn.getAttribute("data-url") || "/chat/";
            window.location.href = redirectUrl;
          });
          closeBtn.dataset.bound = "true";
        }
      } else {
        // 서버 폼 에러 매핑
        if (result.errors && (result.errors.old_password || result.errors.current_password)) {
          currentMsg.textContent = "잘못된 비밀번호입니다. 비밀번호를 다시 입력해주세요.";
          currentMsg.style.color = "red";
        } else if (result.errors && (result.errors.new_password2 || result.errors.new_password1)) {
          // 새 비밀번호 정책/일치 오류도 화면에 표시
          newPwMsg.textContent = "비밀번호 정책을 확인하거나, 두 비밀번호가 일치하는지 확인하세요.";
          newPwMsg.style.color = "red";
        } else {
          alert("비밀번호 변경 실패: 입력을 확인해주세요.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  });
})();

