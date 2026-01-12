// src/scripts/cookies.js
document.addEventListener("DOMContentLoaded", () => {
    const KEY = "cocofibra_cookies";
    const banner = document.getElementById("cookies-banner");
    const acceptBtn = document.getElementById("cookies-accept");

    if (!banner || !acceptBtn) return;

    // Comprobar preferencia
    const accepted =
        localStorage.getItem(KEY) ||
        document.cookie.includes(`${KEY}=accepted`);

    if (!accepted) {
        banner.classList.remove("hidden");
    }

    acceptBtn.addEventListener("click", () => {
        try {
            localStorage.setItem(KEY, "accepted");
        } catch (e) {
            // fallback cookie técnica (1 año)
            document.cookie = `${KEY}=accepted; path=/; max-age=31536000; SameSite=Lax`;
        }

        banner.classList.add("hidden");
    });
});
