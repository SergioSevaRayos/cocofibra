// src/scripts/preguntas.js
document.addEventListener("DOMContentLoaded", () => {
    const items = Array.from(document.querySelectorAll(".faq-item"));
    if (!items.length) return;

    const SVG_PLUS = `
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

    const SVG_CLOSE = `
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M6 6l12 12M18 6L6 18"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

    // Inicialización
    items.forEach((item) => {
        const button = item.querySelector("[data-faq-button]");
        const icon = item.querySelector(".faq-icon");

        if (!button || !icon) return;

        icon.innerHTML = SVG_PLUS;

        button.addEventListener("click", () => {
            const opened = document.querySelector(".faq-item.active");

            if (opened && opened !== item) {
                opened.classList.remove("active");
                const openedIcon = opened.querySelector(".faq-icon");
                if (openedIcon) openedIcon.innerHTML = SVG_PLUS;
            }

            const isOpen = item.classList.toggle("active");
            icon.innerHTML = isOpen ? SVG_CLOSE : SVG_PLUS;
        });
    });

    // Animación de entrada
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("entered");
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
});
