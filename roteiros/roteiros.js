document.addEventListener("DOMContentLoaded", () => {

    const favoriteButton = document.getElementById("favoriteButton");
    const routeButton = document.getElementById("routeButton");
    const backButton = document.getElementById("backButton");
    const mapLink = document.getElementById("mapLink");


    /* ==========================================
       FAVORITO
       ========================================== */

    favoriteButton.addEventListener("click", () => {

        favoriteButton.classList.toggle("active");

        const star = favoriteButton.querySelector("span");

        if (favoriteButton.classList.contains("active")) {
            star.textContent = "★";
        } else {
            star.textContent = "☆";
        }

    });


    /* ==========================================
       BOTÃO VOLTAR
       ========================================== */

    backButton.addEventListener("click", () => {

        if (window.history.length > 1) {
            window.history.back();
        }

    });


    /* ==========================================
       VER NO MAPA
       ========================================== */

    mapLink.addEventListener("click", () => {

        window.location.href = "../mapas/mapas.html";

    });


    /* ==========================================
       CRIAR ROTA
       ========================================== */

    routeButton.addEventListener("click", () => {

        window.location.href = "../mapas/mapas.html";

    });

});