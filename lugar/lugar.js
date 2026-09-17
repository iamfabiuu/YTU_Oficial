document.addEventListener("DOMContentLoaded", () => {

    const backButton = document.getElementById("backButton");
    const favoriteButton = document.getElementById("favoriteButton");
    const mapButton = document.getElementById("mapButton");
    const routeButton = document.getElementById("routeButton");


    backButton.addEventListener("click", () => {

        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "/home/home.html";
        }

    });


    favoriteButton.addEventListener("click", () => {

        favoriteButton.classList.toggle("active");

        const icon = favoriteButton.querySelector("span");

        if (favoriteButton.classList.contains("active")) {

            icon.textContent = "★";

            favoriteButton.setAttribute(
                "aria-label",
                "Remover dos favoritos"
            );

        } else {

            icon.textContent = "☆";

            favoriteButton.setAttribute(
                "aria-label",
                "Favoritar"
            );

        }

    });


    mapButton.addEventListener("click", () => {

        const destination = encodeURIComponent(
            "Paço do Frevo, Praça do Arsenal, Recife, PE"
        );

        window.open(
            `https://www.google.com/maps/search/?api=1&query=${destination}`,
            "_blank"
        );

    });


    routeButton.addEventListener("click", () => {

        window.location.href = "/roteiros/roteiros.html";

    });

});