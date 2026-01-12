// src/scripts/localidades.js
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".localidad-item");
    if (!items.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                if (el.dataset.animated === "true") return;
                el.dataset.animated = "true";

                const index = Array.from(items).indexOf(el);

                // Estado inicial
                el.style.opacity = "0";
                el.style.transform = "translateY(40px)";
                el.style.transition = `opacity 0.6s cubic-bezier(.17,.55,.55,1) ${index * 0.1}s,
                                       transform 0.6s cubic-bezier(.17,.55,.55,1) ${index * 0.1}s`;

                // Activar animación
                requestAnimationFrame(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                });

                observer.unobserve(el);
            });
        },
        { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
});
