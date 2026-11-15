(() => {
  // 1. Show when each component repo was last pushed to (public GitHub API, no key).
  //    If the request fails or is rate limited, the text already in the page stays.
  document.querySelectorAll("[data-pushed]").forEach(el => {
    fetch(`https://api.github.com/repos/${el.dataset.pushed}`)
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(d => {
        const date = new Date(d.pushed_at).toLocaleDateString(undefined, {
          year: "numeric", month: "short", day: "numeric"
        });
        el.textContent = ` · updated ${date}`;
      })
      .catch(() => {});
  });

  // 2. Copy buttons.
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const target = document.querySelector(btn.dataset.copy);
      try {
        await navigator.clipboard.writeText(target.textContent);
        btn.classList.add("is-done");
        setTimeout(() => btn.classList.remove("is-done"), 1200);
      } catch {}
    });
  });

  // 3. Material-style ripple on buttons.
  document.querySelectorAll(".btn, .icon-btn").forEach(el => {
    el.addEventListener("pointerdown", e => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const span = document.createElement("span");
      span.className = "ripple";
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${e.clientX - rect.left - size / 2}px`;
      span.style.top = `${e.clientY - rect.top - size / 2}px`;
      el.appendChild(span);
      span.addEventListener("animationend", () => span.remove());
    });
  });
})();
