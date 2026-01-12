document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("faq-search");
    const items = [...document.querySelectorAll(".faq-item-pro")];

    // Abrir / cerrar
    items.forEach((item) => {
        const btn = item.querySelector("[data-faq-button]");
        btn.addEventListener("click", () => {
            item.classList.toggle("open");
        });
    });

    // Búsqueda predictiva
    search.addEventListener("input", () => {
        const q = search.value.trim().toLowerCase();

        items.forEach((item) => {
            const text = item.innerText.toLowerCase();

            if (text.includes(q)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});
