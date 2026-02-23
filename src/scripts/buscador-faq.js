// src/scripts/buscador-faq.js
document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("faq-search");
    // 1. Corregimos la clase para que coincida con el HTML actual (.faq-item)
    const items = [...document.querySelectorAll(".faq-item")];

    // Si no hay buscador en esta página, detenemos el script para evitar errores
    if (!search) return;

    // 2. Búsqueda predictiva
    search.addEventListener("input", () => {
        const q = search.value.trim().toLowerCase();

        items.forEach((item) => {
            // Buscamos tanto en la pregunta como en la respuesta
            const text = item.innerText.toLowerCase();

            if (text.includes(q)) {
                item.style.display = ""; // Muestra el elemento si coincide
            } else {
                item.style.display = "none"; // Lo oculta si no coincide
            }
        });
    });
});