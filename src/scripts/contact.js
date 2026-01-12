document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");

    if (elements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-active");
                }
            });
        }, { threshold: 0.15 });

        elements.forEach((el) => observer.observe(el));
    }
});
