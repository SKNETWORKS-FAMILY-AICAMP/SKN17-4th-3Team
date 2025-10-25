document.addEventListener("DOMContentLoaded", () => {
  const newChatBtn  = document.getElementById("newChatBtn");
  const modal       = document.getElementById("modal");
  const closeBtn    = document.getElementById("closeBtn");
  const modalBody   = document.getElementById("modalBody");

  // ✅ 서버에서 부분 템플릿(chatchoice.html)을 가져올 URL
  // Django에서 partial을 돌려주는 엔드포인트를 사용하세요.
  // (예: path('chat-choice/', views.chat_choice_partial, name='chat_choice_partial'))
  // 템플릿 태그를 못 쓰는 정적 JS라면 하드코딩 경로를 씁니다.
  const PARTIAL_URL = "/chat/chat_choice/";  // 필요시 실제 라우트로 변경

  // 페이지 로드 시 모달은 숨김
  if (modal && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
  }

  // "새 채팅" 버튼 클릭 시: chatchoice.html을 모달에 로드
  if (newChatBtn) {
    newChatBtn.addEventListener("click", async () => {
      if (!modal || !modalBody) return;

      try {
        const res = await fetch(PARTIAL_URL, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        });
        if (!res.ok) throw new Error("모달 콘텐츠 로드 실패");

        const html = await res.text();
        modalBody.innerHTML = html;           // 모달 내용 주입
        modal.classList.remove("hidden");     // 모달 열기
        document.body.style.overflow = "hidden"; // 배경 스크롤 잠금

        // (선택) chatchoice 내부 버튼들 이벤트 연결 예시
        modalBody.querySelectorAll(".region-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const region = e.currentTarget.dataset.region;
            // TODO: region으로 새 세션 만들기 or 페이지 이동
            // location.href = `/chat/new-session?region=${encodeURIComponent(region)}`;
            modal.classList.add("hidden");
            document.body.style.overflow = "";
          });
        });

      } catch (err) {
        console.error(err);
        alert("새 채팅 화면을 여는 중 문제가 발생했습니다.");
      }
    });
  }

  // 닫기 버튼 클릭 시 모달 닫기
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
      if (modalBody) modalBody.innerHTML = "";
    });
  }
});
