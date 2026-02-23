document.addEventListener("DOMContentLoaded", () => {
    const items = Array.from(document.querySelectorAll(".faq-item"));
    if (!items.length) return;

    const SVG_PLUS = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

    const SVG_CLOSE = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

    // Inicialización
    items.forEach((item) => {
        const button = item.querySelector("[data-faq-button]");
        const icon = item.querySelector(".faq-icon");
        // Busca la clase nueva, y si no la encuentra, busca la vieja por si acaso
        const answer = item.querySelector(".faq-respuesta") || item.querySelector(".faq-back");// <--- Apuntamos a la nueva clase

        if (!button || !icon || !answer) return;

        // Estado inicial
        icon.innerHTML = SVG_PLUS;
        button.setAttribute("aria-expanded", "false");
        answer.setAttribute("aria-hidden", "true");
        answer.classList.add("hidden"); // Nos aseguramos de que empiece cerrado

        button.addEventListener("click", () => {
            const opened = document.querySelector(".faq-item.active");

            // 1. Si hay otro ítem abierto, lo cerramos
            if (opened && opened !== item) {
                opened.classList.remove("active");
                
                const openedIcon = opened.querySelector(".faq-icon");
                const openedButton = opened.querySelector("[data-faq-button]");
                const openedAnswer = opened.querySelector(".faq-respuesta");

                if (openedIcon) openedIcon.innerHTML = SVG_PLUS;
                if (openedButton) openedButton.setAttribute("aria-expanded", "false");
                if (openedAnswer) {
                    openedAnswer.setAttribute("aria-hidden", "true");
                    openedAnswer.classList.add("hidden"); // Ocultamos el viejo
                }
            }

            // 2. Alternamos el ítem actual
            const isOpen = item.classList.toggle("active");
            icon.innerHTML = isOpen ? SVG_CLOSE : SVG_PLUS;
            
            // 3. Actualizamos ARIA y clases visuales
            button.setAttribute("aria-expanded", isOpen ? "true" : "false");
            answer.setAttribute("aria-hidden", isOpen ? "false" : "true");
            
            if (isOpen) {
                answer.classList.remove("hidden"); // Mostramos el nuevo
            } else {
                answer.classList.add("hidden");
            }
        });
    });

    // Animación de entrada al hacer scroll
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