document.addEventListener("DOMContentLoaded", () => {
    const withdrawBtn = document.getElementById("withdrawBtn");
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("closeBtn");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");

    if (modal) modal.classList.add("hidden");

    withdrawBtn.addEventListener("click", async () => {
        const password = passwordInput.value.trim();

        if (!password) {
            errorMsg.textContent = "비밀번호를 입력해주세요.";
            return;
        }

        const response = await fetch("/chat/withdraw/", {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ password }),
        });

        const data = await response.json();

        if (data.success) {
            errorMsg.textContent = "";
            modal.classList.remove("hidden");

            // 일정 시간 후 홈으로 이동
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } else {
            errorMsg.textContent = data.message;
        }
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // CSRF 토큰 가져오기
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
});