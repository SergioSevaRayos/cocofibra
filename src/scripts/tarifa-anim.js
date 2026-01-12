document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll("[data-anim]");
    const main = document.querySelector("main.fade-in");

    // Animar features con stagger
    items.forEach((el, i) => {
        setTimeout(() => {
            el.style.transition =
                "opacity 420ms cubic-bezier(.17,.55,.55,1), transform 420ms cubic-bezier(.17,.55,.55,1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, 120 * i);
    });

    // Animación de entrada del main
    if (main) {
        main.style.opacity = "0";
        main.style.transform = "translateY(6px)";
        requestAnimationFrame(() => {
            main.style.transition = "opacity 420ms ease, transform 420ms ease";
            main.style.opacity = "1";
            main.style.transform = "translateY(0)";
        });
    }
});
