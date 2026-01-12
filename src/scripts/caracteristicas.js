// src/scripts/caracteristicas.js
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".feature-item");
    if (!items.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;

                // Evitar animación doble
                if (el.dataset.animated === "true") return;
                el.dataset.animated = "true";

                const index = Array.from(items).indexOf(el);
                const isLeftColumn = index % 2 === 0;

                // Aplicar clases dinámicas
                el.classList.add("feature-animate");
                el.classList.add(isLeftColumn ? "from-left" : "from-right");

                observer.unobserve(el);
            });
        },
        { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
});
