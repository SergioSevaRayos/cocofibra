// /src/scripts/tarifasUrl.js
document.addEventListener("DOMContentLoaded", () => {
    const buttons = [...document.querySelectorAll(".filter-btn")];
    const cards = [...document.querySelectorAll("[data-category]")];
    const header = document.querySelector("header"); // header fijo

    if (!buttons.length || !cards.length) return;

    function getHeaderOffset() {
        if (!header) return 0;
        const styles = window.getComputedStyle(header);
        const height = header.offsetHeight;
        const marginBottom = parseInt(styles.marginBottom) || 0;
        return height + marginBottom + 10; // pequeño margen de seguridad
    }

    function setActiveButton(active) {
        buttons.forEach((btn) => {
            const isActive = btn === active;

            // RESET TOTAL DE ESTILOS DE ESTADO
            btn.classList.remove(
                "bg-primary-500",
                "text-white",
                "shadow-gym-card",
                "bg-secondary-100",
                "text-accent-700"
            );

            if (isActive) {
                // ESTADO ACTIVO
                btn.classList.add(
                    "bg-primary-500",
                    "text-white",
                    "shadow-gym-card"
                );
                btn.setAttribute("aria-selected", "true");
            } else {
                // ESTADO INACTIVO
                btn.classList.add(
                    "bg-secondary-100",
                    "text-accent-700"
                );
                btn.setAttribute("aria-selected", "false");
            }
        });
    }



    function applyFilter(filter) {
        cards.forEach((card) => {
            const cat = card.dataset.category;
            const matches = filter === "all" || filter === cat;

            if (matches) {
                card.classList.remove("hidden");
                card.setAttribute("aria-hidden", "false");

                card.classList.remove("fade-in-active");
                requestAnimationFrame(() => {
                    card.classList.add("fade-in-active");
                });
            } else {
                card.classList.add("hidden");
                card.classList.remove("fade-in-active");
                card.setAttribute("aria-hidden", "true");
            }
        });

        document.dispatchEvent(new Event("tarifas:updated"));
    }

    function scrollToFirstVisible() {
        const firstVisible = document.querySelector("[data-category]:not(.hidden)");

        if (!firstVisible) return;

        const headerOffset = getHeaderOffset();
        const rect = firstVisible.getBoundingClientRect();
        const absoluteY = rect.top + window.scrollY;

        window.scrollTo({
            top: absoluteY - headerOffset,
            behavior: "smooth"
        });
    }

    // Inicial
    const initial = buttons[0];
    setActiveButton(initial);
    applyFilter(initial.dataset.filter || "all");

    // Listeners
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter || "all";
            setActiveButton(btn);
            applyFilter(filter);
            scrollToFirstVisible();
        });
    });
});
