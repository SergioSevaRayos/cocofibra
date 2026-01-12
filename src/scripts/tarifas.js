// src/scripts/tarifas.js
document.addEventListener("DOMContentLoaded", () => {
  const items = [...document.querySelectorAll(".tarifa-item")];
  if (!items.length) return;

  // Estado inicial
  items.forEach((el) => {
    el.dataset.animated = "false";
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
  });

  const animateCard = (el, index = 0) => {
    const delay = index * 0.08;

    el.style.transition = `
            opacity 0.55s cubic-bezier(.17,.55,.55,1) ${delay}s,
            transform 0.55s cubic-bezier(.17,.55,.55,1) ${delay}s
        `;

    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        if (el.dataset.animated === "true") return;

        const visibleItems = items.filter(
          (i) => !i.classList.contains("hidden")
        );
        const index = visibleItems.indexOf(el);

        el.dataset.animated = "true";
        animateCard(el, index);

        observer.unobserve(el);
      });
    },
    { threshold: 0.1 }
  );

  items.forEach((item) => observer.observe(item));

  // Cuando se actualiza el filtrado
  document.addEventListener("tarifas:updated", () => {
    const visibleItems = items.filter(
      (i) => !i.classList.contains("hidden")
    );

    visibleItems.forEach((el, index) => {
      // Reset visual
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.dataset.animated = "true";

      animateCard(el, index);
    });
  });
});
