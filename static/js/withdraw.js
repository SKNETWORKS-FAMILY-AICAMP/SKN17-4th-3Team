document.addEventListener("DOMContentLoaded", () => {
    const withdrawBtn = document.getElementById("withdrawBtn");
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("closeBtn");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");

    // 페이지 로드 시 모달은 항상 숨김 상태로 시작
    if (modal) {
        modal.classList.add("hidden");
    }

    // 회원탈퇴 버튼 클릭 시
    withdrawBtn.addEventListener("click", () => {
        const password = passwordInput.value.trim();

        // 비밀번호 확인 (임의로 1234로 설정)
        if (password !== "1234") {
            errorMsg.textContent = "비밀번호가 틀렸습니다.";
            return;
        }

        // 비밀번호가 1234인 경우 모달창 열기
        errorMsg.textContent = "";
        modal.classList.remove("hidden");
    });

    // 닫기 버튼 클릭 시 모달 숨기기
    closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});