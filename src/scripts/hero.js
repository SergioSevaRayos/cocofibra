// src/scripts/hero.js
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".hero-main");
  if (!main) return;

  // Estado inicial
  main.style.opacity = "0";
  main.style.transform = "translateX(-40px)";
  main.style.transition = "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";

  // Forzar un reflow para que la transición se aplique correctamente
  requestAnimationFrame(() => {
    main.style.opacity = "1";
    main.style.transform = "translateX(0)";
  });
});
