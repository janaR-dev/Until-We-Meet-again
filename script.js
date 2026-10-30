(() => {
  const menuToggle = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#main-nav");
  const progress = document.querySelector("#progress-bar");

  const closeMenu = () => {
    nav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    nav?.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, amount))}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Reveal sections as they enter the viewport; keep content visible if motion is reduced.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  
  const photoNames = ["hero", "team", "players", "match", "friends", "sunset", "j300"];
  const extensions = ["jpg", "jpeg", "png", "webp"];
  document.querySelectorAll("[data-image]").forEach(slot => {
    const name = slot.dataset.image;
    if (!photoNames.includes(name)) return;
    const tryExtension = index => {
      if (index >= extensions.length) return;
      const image = new Image();
      image.alt = "";
      image.decoding = "async";
      image.onload = () => {
        slot.prepend(image);
        slot.classList.add("has-image");
      };
      image.onerror = () => tryExtension(index + 1);
      image.src = `assets/photos/itf-images/${name}.${extensions[index]}`;
    };
    tryExtension(0);
  });
})();