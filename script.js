// Sélecteurs d'éléments
const menuContainer = document.getElementById("menuContainer");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const navMobileOpen = document.getElementById("nav-open");
const navMobile = document.getElementById("nav");
const navMobileContent = document.getElementById("nav-content");
const navMobileClose = document.getElementsByClassName("nav-close");
const fadeInElements = document.querySelectorAll(".fade");
const header = document.querySelector("header");

let scrollAmount = 0;
let lastScrollTop = 0;
const hideThreshold = 45;
let navMobileOpenned = false;

// Gestionnaires d'événements
function addEventListeners() {
    navMobileOpen.addEventListener("click", toggleNav);
    Array.from(navMobileClose).forEach((button) => {
        button.addEventListener("click", toggleNav);
    });
    leftBtn.addEventListener("click", scrollLeft);
    rightBtn.addEventListener("click", scrollRight);
    document.addEventListener("DOMContentLoaded", fadeInOnScroll);
    window.addEventListener("scroll", displayHeader, false);
    initializeSmoothScroll();
}

// Fonctions
function toggleNav() {
    const isOpen = navMobile.classList.contains("opacity-100");
    header.classList.toggle("h-full", !isOpen);
    navMobile.classList.toggle("opacity-0");
    navMobile.classList.toggle("-z-10");
    navMobile.classList.toggle("opacity-100");
    navMobile.classList.toggle("z-50");
    navMobileContent.classList.toggle("hidden");
    navMobileContent.classList.toggle("relative");
    navMobileOpenned = !navMobileOpenned;
    void header.offsetHeight;
}

function displayHeader() {
    if (!navMobileOpenned) {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > hideThreshold) {
            header.classList.add("opacity-0", "z-10");
            header.classList.remove("opacity-100", "z-20");
            header.style.pointerEvents = "none";
        } else if (currentScroll < lastScrollTop || currentScroll <= hideThreshold) {
            header.classList.add("opacity-100", "z-20");
            header.classList.remove("opacity-0", "z-10");
            header.style.pointerEvents = "auto";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
    void header.offsetHeight;
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

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

// Initialisation
addEventListeners();
