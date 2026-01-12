document.addEventListener("DOMContentLoaded", () => {
    const items = [...document.querySelectorAll("[data-anim]")];

    items.forEach((el, i) => {
        setTimeout(() => {
            el.style.transition =
                "opacity 420ms cubic-bezier(.17,.55,.55,1), transform 420ms cubic-bezier(.17,.55,.55,1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, 120 * i);
    });
});
