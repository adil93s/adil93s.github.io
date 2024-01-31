// Sélecteurs d'éléments
const menuContainer = document.getElementById("menuContainer");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const navOpen = document.getElementById("nav-open");
const nav = document.getElementById("nav");
const navClose = document.getElementsByClassName("nav-close");
const fadeInElements = document.querySelectorAll(".fade");

let scrollAmount = 0;

// Gestionnaires d'événements
function addEventListeners() {
    navOpen.addEventListener("click", toggleNav);
    Array.from(navClose).forEach((button) => {
        button.addEventListener("click", toggleNav);
    });
    leftBtn.addEventListener("click", scrollLeft);
    rightBtn.addEventListener("click", scrollRight);
    document.addEventListener("DOMContentLoaded", fadeInOnScroll);
}

// Fonctions
function toggleNav() {
    nav.classList.toggle("opacity-0");
    nav.classList.toggle("-z-10");
    nav.classList.toggle("opacity-100");
    nav.classList.toggle("z-50");
}

function scrollLeft() {
    const maxScrollLeft = 0;
    const desiredScrollLeft = scrollAmount - 352;
    scrollAmount = Math.max(desiredScrollLeft, maxScrollLeft);
    menuContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
}

function scrollRight() {
    const maxScrollRight = menuContainer.scrollWidth - menuContainer.clientWidth;
    const desiredScrollRight = scrollAmount + 352;
    scrollAmount = Math.min(desiredScrollRight, maxScrollRight);
    menuContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
}

function fadeInOnScroll() {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.5 }
    );

    fadeInElements.forEach((el) => {
        observer.observe(el);
    });
}

// Initialisation
addEventListeners();
