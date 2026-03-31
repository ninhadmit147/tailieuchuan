(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* Scroll reveal */
  if ("IntersectionObserver" in window) {
    const revealEls = $$("[data-reveal]");
    const rev = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            rev.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => rev.observe(el));
  } else {
    $$("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  }

  /* Mobile nav */
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$(".nav-list a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Modal */
  const backdrop = $("#modalBackdrop");
  const modalClose = $("#modalClose");
  const openButtons = $$("[data-open-modal]");

  function openModal() {
    if (!backdrop) return;
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    const firstInput = backdrop.querySelector("input, button");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!backdrop) return;
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }

  openButtons.forEach((btn) => btn.addEventListener("click", openModal));
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !backdrop.hidden) closeModal();
    });
  }

  function handleFormSubmit(msg) {
    return (e) => {
      e.preventDefault();
      alert(msg);
      closeModal();
      e.target.reset();
    };
  }

  const heroForm = $("#heroForm");
  if (heroForm) {
    heroForm.addEventListener(
      "submit",
      handleFormSubmit("Cảm ơn bạn! Chúng tôi sẽ liên hệ tư vấn sớm nhất.")
    );
  }

  const modalForm = $("#modalForm");
  if (modalForm) {
    modalForm.addEventListener(
      "submit",
      handleFormSubmit("Đã gửi đăng ký demo. Kiểm tra email/SMS trong vài phút.")
    );
  }

  /* Countdown — kết thúc 24h kể từ lần đầu mở trang (session) */
  const countdownEl = $("#countdown");
  if (countdownEl) {
    const KEY = "dgnl-offer-end";
    let end = sessionStorage.getItem(KEY);
    if (!end) {
      end = String(Date.now() + 24 * 60 * 60 * 1000);
      sessionStorage.setItem(KEY, end);
    }
    const endTime = parseInt(end, 10);

    function tick() {
      const left = Math.max(0, endTime - Date.now());
      const h = Math.floor(left / 3600000);
      const m = Math.floor((left % 3600000) / 60000);
      const s = Math.floor((left % 60000) / 1000);
      countdownEl.textContent = `${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* Stat counters */
  const statNumbers = $$(".stat-number[data-count]");
  if (statNumbers.length && "IntersectionObserver" in window) {
    const animateValue = (el, target, duration) => {
      const start = 0;
      const t0 = performance.now();
      function frame(now) {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - (1 - p) * (1 - p);
        const val = Math.round(start + (target - start) * eased);
        el.textContent = String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const raw = el.getAttribute("data-count");
          const target = raw ? parseInt(raw, 10) : 0;
          io.unobserve(el);
          animateValue(el, target, 1600);
        });
      },
      { threshold: 0.35 }
    );

    statNumbers.forEach((el) => io.observe(el));
  }

  /* Daily progress micro-proof */
  const teacherProgress = $("#teacherProgress");
  const offerProgressFill = $("#offerProgressFill");
  const recentSignup = $("#recentSignup");
  if (teacherProgress) {
    const KEY = "dgnl-teacher-progress";
    let value = sessionStorage.getItem(KEY);
    if (!value) {
      value = String(80 + Math.floor(Math.random() * 6));
      sessionStorage.setItem(KEY, value);
    }
    teacherProgress.textContent = `${value}%`;
    if (offerProgressFill) {
      offerProgressFill.style.width = `${value}%`;
    }
  }

  if (recentSignup) {
    const KEY = "dgnl-recent-signup";
    let value = sessionStorage.getItem(KEY);
    if (!value) {
      value = String(9 + Math.floor(Math.random() * 7));
      sessionStorage.setItem(KEY, value);
    }
    recentSignup.textContent = value;
  }
})();
