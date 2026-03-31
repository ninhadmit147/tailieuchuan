(function () {
  const subjects = [
    {
      name: "Toán",
      price: "499.000đ",
      lessons: 24,
      exams: 12,
      duration: "90 ngày",
      desc: "Bộ đề bám sát cấu trúc, luyện tốc độ giải và chiến lược tối ưu điểm số.",
      tag: "Hot",
    },
    {
      name: "Ngữ văn",
      price: "449.000đ",
      lessons: 20,
      exams: 10,
      duration: "90 ngày",
      desc: "Luyện kỹ năng đọc hiểu, nghị luận và khung triển khai bài thi hiệu quả.",
      tag: "Phổ biến",
    },
    {
      name: "Tiếng Anh",
      price: "479.000đ",
      lessons: 22,
      exams: 12,
      duration: "90 ngày",
      desc: "Tập trung ngữ pháp, từ vựng, mẹo làm đề và đề thi mô phỏng theo cấp độ.",
      tag: "Mới",
    },
    {
      name: "Vật lý",
      price: "459.000đ",
      lessons: 18,
      exams: 10,
      duration: "60 ngày",
      desc: "Ôn công thức trọng tâm, dạng bài thường gặp và kỹ năng xử lý câu vận dụng.",
      tag: "Khối A",
    },
    {
      name: "Hóa học",
      price: "459.000đ",
      lessons: 18,
      exams: 10,
      duration: "60 ngày",
      desc: "Hệ thống hóa lý thuyết, phản ứng trọng điểm và phương pháp giải nhanh.",
      tag: "Khối B",
    },
    {
      name: "Sinh học",
      price: "459.000đ",
      lessons: 18,
      exams: 10,
      duration: "60 ngày",
      desc: "Bám sát chuyên đề di truyền, sinh thái, tiến hóa và các câu hỏi phân hóa.",
      tag: "Y dược",
    },
    {
      name: "Lịch sử",
      price: "429.000đ",
      lessons: 16,
      exams: 8,
      duration: "60 ngày",
      desc: "Tóm tắt mốc thời gian quan trọng, sơ đồ tư duy và bài tập luyện nhớ lâu.",
      tag: "Xã hội",
    },
    {
      name: "Địa lý",
      price: "429.000đ",
      lessons: 16,
      exams: 8,
      duration: "60 ngày",
      desc: "Kết hợp Atlat, kỹ năng xử lý biểu đồ và đề thi thử theo chuyên đề.",
      tag: "Atlat",
    },
    {
      name: "GDCD",
      price: "399.000đ",
      lessons: 14,
      exams: 8,
      duration: "45 ngày",
      desc: "Nắm chắc lý thuyết, tình huống thực tế và phương pháp nhận diện đáp án đúng.",
      tag: "Dễ tăng điểm",
    },
  ];

  const benefits = [
    "Đề thi bám sát cấu trúc kỳ thi",
    "Mỗi môn có lộ trình và bộ đề riêng",
    "Truy cập online mọi lúc trên điện thoại và máy tính",
    "Có phân tích đáp án và thống kê tiến độ học",
  ];

  function el(tag, attrs, html) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (k === "class") node.className = attrs[k];
        else if (k === "dataset") Object.assign(node.dataset, attrs.dataset);
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
      return map[m];
    });
  }

  function renderBenefits() {
    const grid = document.getElementById("benefitsGrid");
    if (!grid) return;

    // Lucide icons: ShieldCheck (để giống ShieldCheck trong React)
    const iconHtml = (cls) => `<i data-lucide="ShieldCheck" class="${cls}" aria-hidden="true"></i>`;

    grid.innerHTML = benefits
      .map(
        (b) => `
        <div class="bn-item">
          ${iconHtml("bn-icon")}
          <p class="bn-text">${escapeHtml(b)}</p>
        </div>
      `
      )
      .join("");
  }

  function renderSubjects() {
    const grid = document.getElementById("subjectsGrid");
    if (!grid) return;

    const iconStyle = "sub-head-icon";

    grid.innerHTML = subjects
      .map((subject, index) => {
        return `
          <div class="fx-reveal" data-reveal style="transition-delay:${index * 40}ms">
            <div class="sub-card">
              <div class="sub-body">
                <div class="sub-head">
                  <div>
                    <span class="sub-tag">${escapeHtml(
                      subject.tag
                    )}</span>
                    <h3 class="sub-name">${escapeHtml(subject.name)}</h3>
                  </div>
                  <div class="sub-icon-box">
                    <i data-lucide="GraduationCap" class="${iconStyle}" aria-hidden="true"></i>
                  </div>
                </div>

                <p class="sub-desc">${escapeHtml(subject.desc)}</p>

                <div class="sub-meta-grid">
                  <div class="sub-meta">
                    <i data-lucide="BookOpen" class="sub-meta-icon" aria-hidden="true"></i>
                    <div class="sub-meta-value">${escapeHtml(subject.lessons)}</div>
                    <div class="sub-meta-label">Bài học</div>
                  </div>
                  <div class="sub-meta">
                    <i data-lucide="FileText" class="sub-meta-icon" aria-hidden="true"></i>
                    <div class="sub-meta-value">${escapeHtml(subject.exams)}</div>
                    <div class="sub-meta-label">Đề thi</div>
                  </div>
                  <div class="sub-meta">
                    <i data-lucide="Clock3" class="sub-meta-icon" aria-hidden="true"></i>
                    <div class="sub-meta-value">${escapeHtml(subject.duration)}</div>
                    <div class="sub-meta-label">Truy cập</div>
                  </div>
                </div>

                <div class="sub-price-row">
                  <div>
                    <div class="sub-price-label">Giá gói môn học</div>
                    <div class="sub-price-value">${escapeHtml(subject.price)}</div>
                  </div>
                  <button type="button" class="btn btn-hero">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderFeatures() {
    const grid = document.getElementById("featureGrid");
    if (!grid) return;

    const features = [
      {
        title: "Học theo mục tiêu",
        text: "Học sinh chọn đúng môn cần tăng điểm thay vì mua gói dàn trải không cần thiết.",
      },
      {
        title: "Thanh toán đơn giản",
        text: "Có thể gắn nút Mua ngay, đăng ký học thử hoặc thanh toán qua ví điện tử / chuyển khoản.",
      },
      {
        title: "Tối ưu chuyển đổi",
        text: "Thiết kế card rõ giá, nội dung, số lượng đề và lợi ích để khách ra quyết định nhanh hơn.",
      },
    ];

    grid.innerHTML = features
      .map(
        (item) => `
          <div class="feat-card fx-reveal" data-reveal>
            <div class="feat-icon-box">
              <i data-lucide="Star" class="feat-icon" aria-hidden="true"></i>
            </div>
            <h3 class="feat-title">${escapeHtml(item.title)}</h3>
            <p class="feat-desc">${escapeHtml(item.text)}</p>
          </div>
        `
      )
      .join("");
  }

  function initReveal() {
    const els = [...document.querySelectorAll("[data-reveal]")];
    if (!("IntersectionObserver" in window)) {
      els.forEach((n) => n.classList.add("is-show"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-show");
            obs.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    els.forEach((n) => obs.observe(n));
  }

  function initLucide() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  // Boot
  renderBenefits();
  renderSubjects();
  renderFeatures();
  initReveal();
  initLucide();
})();

